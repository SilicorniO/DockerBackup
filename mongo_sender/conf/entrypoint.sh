#!/bin/bash

# move to backups folder
cd /backups

# restore backup
if [ -d "./restore" ]; then
    echo "Restoring backup in database ${ENVIRONMENT}"
    mongorestore --host mongo -d ${ENVIRONMENT} ./restore
    rm -rf ./restore
fi

while [ true ]; do

    # generate the suffix for files
    hour=$(date +"%H")
    now=$(date +"%Y%m%d%H%M")
    echo "Starting backup: ${now}"

    echo "Executing database backup"
    /usr/bin/mongodump --host mongo -d ${ENVIRONMENT} --port 27017 --out .
    zip -r aluzina_${ENVIRONMENT}_${now}.dump.zip ${ENVIRONMENT}
    rm -rf ${ENVIRONMENT}

    if [ "$hour" = "$BACKUP_FILES_HOUR" ]; then
        echo "Executing admin backup"
        zip -r aluzina_${ENVIRONMENT}_${now}.admin.zip /webservices

        echo "Executing landing backup"
        zip -r aluzina_${ENVIRONMENT}_${now}.landing.zip /landing
    fi

    echo "Removing old files"
    find /backups/ -mtime +$BACKUP_DAYS -exec rm -rf {} \;
    echo "" > .gitkeep

    if [ "$S3_ACCESS_KEY" != "" ]; then
        echo "Syncing files to S3"
        aws configure set aws_access_key_id $S3_ACCESS_KEY
        aws configure set aws_secret_access_key $S3_SECRET_KEY
        aws configure set AWS_DEFAULT_REGION $S3_REGION
        if [ "${ENVIRONMENT}" = "local" ]; then
            aws s3 sync /backups s3://aluzina-test --delete
        else
            aws s3 sync /backups s3://aluzina-${ENVIRONMENT} --delete
        fi
    fi

    echo "Sleeping"
    sleep $BACKUP_SLEEP

done