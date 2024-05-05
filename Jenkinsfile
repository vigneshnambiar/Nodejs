pipeline {
    agent any
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
    }
}
