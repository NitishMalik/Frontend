<#
.SYNOPSIS
This script performs local execution of acceptance test suite. It runs on a deployable instance so a successful build is required for the same.  

.DESCRIPTION
This script performs the following tasks
    a. Spins up the application and acceptance test runner containers and executes the acceptance suite via docker-compose
    b. Cleans up the containers irrespective of the outcome. The corresponding docker images are not deleted

.EXAMPLE
./src/_tests_/acceptance/acceptance-local.ps1
#>

# Check for application and acceptance docker images
Invoke-Expression "docker-compose -f docker-compose.local.yml down --remove-orphans; docker-compose -f docker-compose.local.yml build; docker-compose -f docker-compose.local.yml up --abort-on-container-exit; docker-compose rm -f"