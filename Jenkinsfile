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
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'Vickydock123@', usernameVariable: 'vicky275')]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh 'docker push vicky275/jwtbasic:v4'
                }
            }
        }
    }
}
