#!/bin/bash

migration_name=$1

if [ $# -eq 0 ]
  then
    echo "Input migration name:";
    read migration_name
fi

curr_dir="$(dirname -- "$0")";
curr_datetime="$(date +"%Y%m%d%H%M%S")";

cp "$curr_dir/source-migration.ts" "$curr_dir/../migrations/$curr_datetime-$migration_name.ts"
