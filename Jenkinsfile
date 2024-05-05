pipeline {
    agent none
    stages {
        stage('Install npm') {
            steps {
                // Install npm
                sh 'npm install'
            }
        }
        stage('Docker Build') {
            agent any
            steps {
                // Build Docker image
                sh 'docker build -t vicky275/jwtbasic:v4 .'
            }
        }
    }
}
