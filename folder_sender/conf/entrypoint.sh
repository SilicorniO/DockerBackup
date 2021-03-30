#!/bin/bash

# sleep some seconds
sleep 5

while [ true ]; do

    # generate the suffix for files
    hour=$(date +"%H")
    now=$(date +"%Y%m%d%H%M%S")
    echo "Starting backup: ${now}"

    echo "Executing folder backup"
    cd /folder
    zip -r -9 /backups/${ENVIRONMENT}_${FOLDER_NAME}_${now}.zip .
    cd /backups

    if [ "$BACKUP_SECRET" != "" ]; then
        echo "Sending files to silicornio backup"
        curl --location --request PUT "${BACKUP_RECEIVER}/data" --header "Authorization: ${BACKUP_SECRET}" --form "${ENVIRONMENT}_${FOLDER_NAME}_${now}.zip=@\"./${ENVIRONMENT}_${FOLDER_NAME}_${now}.zip\""
    fi

    if [ "$S3_ACCESS_KEY" != "" ]; then
        echo "Syncing files to S3"
        aws configure set aws_access_key_id $S3_ACCESS_KEY
        aws configure set aws_secret_access_key $S3_SECRET_KEY
        aws configure set AWS_DEFAULT_REGION $S3_REGION
        aws s3 sync /backups s3://${S3_BUCKET} --delete
    fi

    echo "Removing old files"
    find /backups/ -mtime +$BACKUP_DAYS -exec rm -rf {} \;
    echo "" > .gitkeep

    echo "Sleeping"
    sleep $BACKUP_SLEEP

done