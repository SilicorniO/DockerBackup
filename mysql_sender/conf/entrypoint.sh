#!/bin/bash

# sleep some seconds
sleep 15

# replace variables in mysql configuration file
envsubst < "/config/mysql_template.cnf" > "/etc/my.cnf"

# move to restore folder
cd /restore

# restore backup
if [ -f "./restore.sql" ]; then
    echo "Restoring backup in database ${DATABASE_NAME}"
    /usr/bin/mysql --host=${DATABASE_HOST} --port=${DATABASE_PORT} --user=${DATABASE_USER} --password=${DATABASE_PASSWORD} --database=${DATABASE_NAME} < ./restore.sql
    rm ./restore.sql
fi

# move to backups folder
cd ../backups

while [ true ]; do

    # generate the suffix for files
    hour=$(date +"%H")
    now=$(date +"%Y%m%d%H%M%S")
    echo "Starting backup: ${now}"

    echo "Executing database backup"
    /usr/bin/mysqldump --no-tablespaces ${DATABASE_NAME} > ${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql
    zip ${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql.zip ${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql
    rm ${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql

    if [ "$BACKUP_SECRET" != "" ]; then
        echo "Sending files to silicornio backup"
        curl --location --request PUT "${BACKUP_RECEIVER}/data" --header "Authorization: ${BACKUP_SECRET}" --form "${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql.zip=@\"./${ENVIRONMENT}_${DATABASE_NAME}_${now}.sql.zip\""
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