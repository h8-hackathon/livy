WORK_DIR=$(pwd)

for folder in ../../services/*; do
  if [ -d "$folder" ]; then
    cd "$folder"

    cp -r $WORK_DIR/models $folder
    cp -r $WORK_DIR/config $folder
  fi
done

