#!/usr/bin/env python3
"""
Excel to GeoJSON Converter for Pekanbaru Green Canopy Project
--------------------------------------------------------------
Converts Excel data with tree information to GeoJSON format
compatible with the web application.

Usage:
    python convert_excel_to_geojson.py input.xlsx output.json

Required Excel Columns:
    - No (or OBJECTID)
    - Jenis Pohon
    - Koordinat X (Longitude)
    - Koordinat Y (Latitude)
    - Diameter Pohon
    - Kondisi Pohon
    - Suhu Sekitar
"""

import pandas as pd
import json
import sys
import os
from datetime import datetime


def clean_diameter(diameter_str):
    """Remove ' cm' from diameter and convert to float"""
    if pd.isna(diameter_str):
        return 30.0  # default diameter

    diameter_str = str(diameter_str).replace(' cm', '').replace('cm', '').strip()
    diameter_str = diameter_str.replace(',', '.')

    try:
        return round(float(diameter_str), 2)
    except ValueError:
        return 30.0


def clean_temperature(temp_str):
    """Remove ' C' or '°C' from temperature and convert to float"""
    if pd.isna(temp_str):
        return 28.0  # default temperature

    temp_str = str(temp_str).replace(' C', '').replace('C', '').replace('°C', '').strip()
    temp_str = temp_str.replace(',', '.')

    try:
        return round(float(temp_str), 1)
    except ValueError:
        return 28.0


def standardize_condition(condition_str):
    """Standardize condition to: Sehat, Rusak, or Kering"""
    if pd.isna(condition_str):
        return "Sehat"

    condition_lower = str(condition_str).lower().strip()

    # Sehat variations
    if condition_lower in ['sehat', 'healthy', 'baik', 'good']:
        return "Sehat"

    # Rusak variations
    elif condition_lower in ['rusak', 'damaged', 'kurang baik', 'poor']:
        return "Rusak"

    # Kering/Mati variations
    elif condition_lower in ['kering', 'mati', 'dead', 'dry']:
        return "Kering"

    else:
        print(f"⚠️ Unknown condition '{condition_str}', defaulting to 'Sehat'")
        return "Sehat"


def calculate_ecological_score(diameter, condition):
    """
    Calculate ecological score (1-5) based on diameter and condition

    Args:
        diameter (float): Tree diameter in cm
        condition (str): Tree condition (Sehat/Rusak/Kering)

    Returns:
        float: Ecological score between 1.0 and 5.0
    """
    # Base score from diameter (larger tree = higher score)
    if diameter < 20:
        base_score = 2.5
    elif diameter < 30:
        base_score = 3.0
    elif diameter < 40:
        base_score = 3.5
    elif diameter < 50:
        base_score = 4.0
    elif diameter < 60:
        base_score = 4.5
    else:
        base_score = 5.0

    # Adjust based on condition
    if condition == "Sehat":
        multiplier = 1.0
    elif condition == "Rusak":
        multiplier = 0.7
    else:  # Kering
        multiplier = 0.4

    score = base_score * multiplier

    # Ensure score is between 1.0 and 5.0
    return round(min(max(score, 1.0), 5.0), 1)


def convert_excel_to_geojson(excel_file, output_file=None, location_name="Pekanbaru"):
    """
    Convert Excel file to GeoJSON format

    Args:
        excel_file (str): Path to input Excel file
        output_file (str): Path to output JSON file (optional)
        location_name (str): Default location name
    """

    print(f"📊 Reading Excel file: {excel_file}")

    # Try different sheet names
    try:
        df = pd.read_excel(excel_file)
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return

    print(f"✅ Loaded {len(df)} rows")

    # Detect column names (case-insensitive matching)
    column_mapping = {}
    for col in df.columns:
        col_lower = col.lower().strip()

        if 'jenis' in col_lower and 'pohon' in col_lower:
            column_mapping['species'] = col
        elif col_lower in ['no', 'objectid', 'fid', 'id']:
            column_mapping['no'] = col
        elif 'koordinat' in col_lower and 'x' in col_lower:
            column_mapping['coord_x'] = col
        elif 'koordinat' in col_lower and 'y' in col_lower:
            column_mapping['coord_y'] = col
        elif 'diameter' in col_lower:
            column_mapping['diameter'] = col
        elif 'kondisi' in col_lower:
            column_mapping['condition'] = col
        elif 'suhu' in col_lower:
            column_mapping['temperature'] = col

    # Validate required columns
    required = ['species', 'coord_x', 'coord_y', 'diameter', 'condition', 'temperature']
    missing = [col for col in required if col not in column_mapping]

    if missing:
        print(f"❌ Missing required columns: {missing}")
        print(f"Available columns: {list(df.columns)}")
        return

    print(f"✅ Column mapping detected:")
    for key, value in column_mapping.items():
        print(f"   {key:15} ← {value}")

    # Create GeoJSON structure
    geojson = {
        "type": "FeatureCollection",
        "name": "Pohon Peneduh Pekanbaru",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": []
    }

    # Convert each row
    valid_count = 0
    error_count = 0

    for idx, row in df.iterrows():
        try:
            # Get coordinates
            coord_x = float(row[column_mapping['coord_x']])
            coord_y = float(row[column_mapping['coord_y']])

            # Validate coordinates (Pekanbaru area)
            if not (100.5 <= coord_x <= 102.5 and -1.0 <= coord_y <= 1.5):
                print(f"⚠️ Row {idx+1}: Invalid coordinates [{coord_x}, {coord_y}], skipping")
                error_count += 1
                continue

            # Clean and parse data
            species = str(row[column_mapping['species']]).strip()
            diameter = clean_diameter(row[column_mapping['diameter']])
            temperature = clean_temperature(row[column_mapping['temperature']])
            condition = standardize_condition(row[column_mapping['condition']])

            # Calculate ecological score
            eco_score = calculate_ecological_score(diameter, condition)

            # Generate ID
            tree_id = f"PKU{str(idx+1).zfill(3)}"
            if 'no' in column_mapping and not pd.isna(row[column_mapping['no']]):
                tree_id = f"PKU{str(int(row[column_mapping['no']])).zfill(3)}"

            # Create feature
            feature = {
                "type": "Feature",
                "id": tree_id,
                "geometry": {
                    "type": "Point",
                    "coordinates": [coord_x, coord_y]
                },
                "properties": {
                    "id": tree_id,
                    "species": species,
                    "diameter": diameter,
                    "condition": condition,
                    "temperature": temperature,
                    "ecological_score": eco_score,
                    "location": location_name,
                    "district": "Pekanbaru Kota",
                    "survey_date": datetime.now().strftime("%Y-%m-%d"),
                    "surveyor": "Tim PCR",
                    "notes": ""
                }
            }

            geojson["features"].append(feature)
            valid_count += 1

        except Exception as e:
            print(f"⚠️ Row {idx+1}: Error processing - {e}")
            error_count += 1
            continue

    # Summary statistics
    print(f"\n📊 Conversion Summary:")
    print(f"   Total rows:     {len(df)}")
    print(f"   ✅ Valid:       {valid_count}")
    print(f"   ❌ Errors:      {error_count}")

    # Condition breakdown
    conditions = {}
    for feature in geojson["features"]:
        cond = feature["properties"]["condition"]
        conditions[cond] = conditions.get(cond, 0) + 1

    print(f"\n🌳 Tree Conditions:")
    for cond, count in conditions.items():
        print(f"   {cond:10} {count:3} trees")

    # Save to JSON
    if output_file is None:
        output_file = excel_file.replace('.xlsx', '.json').replace('.xls', '.json')

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(geojson, f, indent=2, ensure_ascii=False)

        print(f"\n✅ GeoJSON saved to: {output_file}")
        print(f"   File size: {os.path.getsize(output_file) / 1024:.1f} KB")
        print(f"\n📋 Next steps:")
        print(f"   1. Copy to: public/data/trees.json")
        print(f"   2. Update Maps.jsx line 63: '/data/trees.json'")
        print(f"   3. Refresh website!")

    except Exception as e:
        print(f"❌ Error saving file: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convert_excel_to_geojson.py input.xlsx [output.json]")
        print("\nExample:")
        print("   python convert_excel_to_geojson.py data_pohon.xlsx trees.json")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    if not os.path.exists(input_file):
        print(f"❌ File not found: {input_file}")
        sys.exit(1)

    convert_excel_to_geojson(input_file, output_file)
