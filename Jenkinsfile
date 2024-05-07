pipeline {
    agent any
    parameters {
        string defaultValue: 'v6', description: 'Enter the correct tag', name: 'Tag'
    }
    stages {
        stage('Install npm') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t vicky275/jwtbasic:v4 .'
            }
        }
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'DockerPassword', usernameVariable: 'DockerUser')]) {
                    sh "docker login -u ${env.DockerUser} -p ${env.DockerPassword}"
                    sh 'docker push vicky275/jwtbasic:${Tag}'
                }
            }
        }
    }
}
