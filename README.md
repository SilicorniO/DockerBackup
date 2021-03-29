# Docker Backup

Backup docker receiver and senders

## Receiver

Environment variables:
- SECRET - Used to authenticate requests
- MAX_TIME - Maximum time to keep files in SECONDS
- MAX_SIZE - Maximum size to keep in MEGABYTES
- NUM_MIN - Minimum number of files

Example:
```
SECRET=Silicornio
MAX_TIME=432000 // 1 week
MAX_SIZE=100 // 100Mb 
NUM_MIN=5 // 5 files
```

Volumes:
- backups - `/usr/src/app/backups`

Ports:
- 4000 - Web service listening

## Docker publish shortcuts

### Docker login
`docker login`

### Docker build
`docker image build . -t silicornio/XXXX:tagname`

### Docker push
`docker push silicornio/XXXX:tagname`

