pipeline {
    agent any

    environment {
        // Docker Hub'dagi akkauntingiz nomini yozing
        DOCKER_USERNAME = 'abdulbositabdurahimovdeveloper'
        IMAGE_NAME = "${DOCKER_USERNAME}/portfolio-frontend"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/sizning_github_ismingiz/portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Docker image'ini yaratamiz
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                    sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Docker Hub'ga login qilish uchun Jenkins'da saqlangan credential'lardan foydalanamiz
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                // Serverga SSH orqali ulanib, yangi containerni ishga tushiramiz
                // Jenkins'da server uchun SSH credential'lari sozlanishi kerak
                sshagent(['server-ssh-credentials']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no user@server_ip '
                            docker pull ${IMAGE_NAME}:latest && \
                            docker stop portfolio-frontend-container || true && \
                            docker rm portfolio-frontend-container || true && \
                            docker run -d --name portfolio-frontend-container -p 80:80 ${IMAGE_NAME}:latest
                        '
                    '''
                }
            }
        }
    }

    post {
        always {
            // Har doim Docker Hub'dan logout qilamiz
            sh "docker logout"
        }
    }
}