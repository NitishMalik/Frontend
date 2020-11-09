from locust import HttpLocust, TaskSet, between, task, TaskSequence

def sampletask(self):
    print("Hello world")

class SampleTaskClass(TaskSequence):
    tasks = {sampletask : 1}

class SampleLocustClass(HttpLocust):
    task_set = SampleTaskClass
    wait_time = between(5.0, 10.0)