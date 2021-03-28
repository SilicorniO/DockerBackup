#!/bin/bash

# sleep some seconds
sleep 5

# restore backup
if [ -d "./restore" ]; then
    echo "Restoring backup in database ${DATABASE_NAME}"
    mongorestore --host ${DATABASE_HOST} --port ${DATABASE_PORT} --db ${DATABASE_NAME} --username ${DATABASE_USER} --password ${DATABASE_PASSWORD} --authenticationDatabase admin ./restore
    rm -rf ./restore
fi

# move to backups folder
cd /backups

while [ true ]; do

    # generate the suffix for files
    hour=$(date +"%H")
    now=$(date +"%Y%m%d%H%M")
    echo "Starting backup: ${now}"

    echo "Executing database backup"
    /usr/bin/mongodump --host ${DATABASE_HOST} --port ${DATABASE_PORT} --db ${DATABASE_NAME} --username ${DATABASE_USER} --password ${DATABASE_PASSWORD} --authenticationDatabase admin --out .
    zip -r ${ENVIRONMENT}_${DATABASE_NAME}_${now}.dump.zip ${DATABASE_NAME}
    rm -rf ${DATABASE_NAME}

    if [ "$BACKUP_SECRET" != "" ]; then
        echo "Sending files to silicornio backup"
        curl --location --request PUT "${BACKUP_RECEIVER}/data" --header "Authorization: ${BACKUP_SECRET}" --form "${ENVIRONMENT}_${DATABASE_NAME}_${now}.dump.zip=@\"./${ENVIRONMENT}_${DATABASE_NAME}_${now}.dump.zip\""
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