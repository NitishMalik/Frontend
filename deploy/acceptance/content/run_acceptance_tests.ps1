<#

.SYNOPSIS
 This script executes acceptance test against a deployed instance of reactjswebapptemplate application

.DESCRIPTION
Acceptance tests are executed from a docker container running on Ocotpus tentacle. 
The target will be a reactjswebapptemplate application deployed in openshit. 
Accpetance test results will be uploaded as Ocotpus Artifact.

.EXAMPLE
$openShiftAppUrl = 'http://reactappthree-route-dotnetcorewebapiforspog-qa.dev.spec.honeywell.com'
$acceptanceTestRepo = 'ce-devops-java-templates-docker-unstable-local.artifactory-na.honeywell.com'
$acceptanceTestImageName = 'javawebapitemplate-acceptancetest'
$acceptanceTestImageVersion = '0.1.30-octopus-openshif0018'
.\run_acceptance_tests.ps1

#>

$currentPath = $((Get-Location).path)
$acceptanceTestResultsFolder = $currentPath + '/reports'

try{
    Write-Host "Starting Acceptance tests"
    Write-Host "Application URL is: $openShiftAppUrl"
    $Env:COMPOSE_CONVERT_WINDOWS_PATHS=1
    $Env:ACCEPTANCE_TEST_DOCKER_IMAGE=$artifactoryDeployServer + '/' + $deployImageName + '-acceptance:' + $acceptanceTestImageVersion
    docker-compose run --rm -e BASE_URL=$openShiftAppUrl acceptance
 
    Write-Host "Completed executing acceptance tests"
    Write-Host "Uploading acceptance test results to Ocotopus"
    Get-ChildItem $acceptanceTestResultsFolder -Recurse -Include *.png | New-OctopusArtifact
    Get-ChildItem $acceptanceTestResultsFolder -Recurse -Include *.xml | New-OctopusArtifact

} 
Catch {
    $ErrorMessage = $_.Exception.Message
    $FailedItem = $_.Exception.ItemName
    Fail-Step  "An error occurred. $ErrorMessage. $FailedItem"
} 
Finally {
    Write-Host "Deleting acceptance test container and images"
    "docker-compose down -v --rmi all  2>&1"
}