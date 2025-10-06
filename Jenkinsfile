pipeline {
    agent any // Jenkins agentida ishlaydi

    // tools {
        // Agar Jenkins agentida Node.js o'rnatilgan bo'lsa va uni bu yerda boshqarmoqchi bo'lsangiz
        // node 'NodeJs_20' // Jenkinsda 'NodeJs_20' nomli Node.js konfiguratsiyasi bo'lsa
    // }

    environment {
        // Imej nomi faqat shu serverda ishlatiladigan bo'lgani uchun oddiyroq bo'lishi mumkin
        // Foydalanuvchi nomi endi shart emas.
        IMAGE_NAME = "portfolio-frontend" // Imej uchun nom
        CONTAINER_NAME = 'portfolio-frontend-container' // Konteyner uchun nom
        PORT = '9999' // Ilova ishlaydigan port
    }

    stages {
        stage('1. Clone Repository') {
            steps {
                cleanWs() // Ish joyini tozalash
                echo 'Klonlash boshlandi...'
                git branch: 'main', url: 'https://github.com/AbdulbositAbdurahimovDeveloper/portfolio.git'
                echo 'Repo muvaffaqiyatli olindi.'
            }
        }

        stage('2. Build Docker Image') {
            steps {
                script {
                    echo "Docker image qurilmoqda: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    // >>> MUHIM: Dockerfile ichidagi Node.js versiyasini 20+ ga yangilashni unutmang! <<<
                    // FROM node:18-alpine ni FROM node:20-alpine ga o'zgartiring
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                    sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest"
                    echo "Docker image muvaffaqiyatli qurildi: ${IMAGE_NAME}:${env.BUILD_NUMBER} va ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('3. Deploy Application') {
            steps {
                echo "Mavjud ${CONTAINER_NAME} konteyneri o'chirilmoqda (agar mavjud bo'lsa)..."
                sh "docker rm -f ${CONTAINER_NAME} || true"

                echo "Konteyner ishga tushirilmoqda: ${CONTAINER_NAME} ${PORT} portida"
                // Yangi konteynerni ishga tushiramiz, avtomatik qayta ishga tushirish siyosati bilan
                sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 --restart unless-stopped ${IMAGE_NAME}:latest"
                echo "Ilova http://localhost:${PORT} manzilida Jenkins hostida ishga tushdi."
            }
        }
    }

    post {
        always {
            echo 'Pipeline tugadi. Ish joyini tozalash...'
            cleanWs()
        }
    }
}
