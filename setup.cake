#load nuget:?package=ce.devops.scripts.build.cake

Environment.SetupDefaultEnvironmentVariables(Context);

BuildParameters.SetParameters(context: Context,
                            buildSystem: BuildSystem,
                            sourceDirectoryPath: "./src/app",
                            title: "bootcamp_trainers.forge-bootcamp-sampleapp",
                            enablePackAndPublishSeparation: true);


Build.RunReact();