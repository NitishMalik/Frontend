# Acceptance Testing

## Remote
1. Build acceptance testing container: `docker build -t reactjswebapptemplate-acceptance .`
2. Run the acceptance testing `docker-compose run --rm -e BASE_URL=<deployed-url> acceptance && docker-compose down && docker-compose rm -f`


## Local
`pwsh ./acceptance-local.ps1`
