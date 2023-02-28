POSTGRES_WORK_DIR=$(pwd)/postgres
MONGODB_WORK_DIR=$(pwd)/mongodb

for folder in ../../services/*; do
  if [ -d "$folder" ]; then
    cd "$folder"

    cp -r $POSTGRES_WORK_DIR/models $folder
    cp -r $POSTGRES_WORK_DIR/config $folder

    cp -r $MONGODB_WORK_DIR/mongo $folder
  fi
done

