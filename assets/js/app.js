(function () {
    "use strict";

    // Função para mostrar mensagens de alerta estilizadas
    function mostrarAlerta(mensagem, tipo = 'success', targetElement = null) {
        const div = document.createElement('div');
        div.className = `alerta alerta-${tipo}`;
        div.style.cssText = `
            position: ${targetElement ? 'absolute' : 'fixed'};
            ${targetElement ? '' : 'top: 20px; right: 20px;'}
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 9999;
            background-color: ${tipo === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            font-weight: 600;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            word-wrap: break-word;
        `;

        if (targetElement) {
            // Posicione o alerta acima do elemento alvo
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            div.style.top = (rect.top + scrollTop - 40) + 'px';
            div.style.left = (rect.left + scrollLeft + rect.width / 2) + 'px';
            div.style.transform = 'translate(-50%, 10px)';
            div.style.pointerEvents = 'auto';
        }

        div.textContent = mensagem;
        document.body.appendChild(div);

        // Trigger reflow to enable transition
        void div.offsetWidth;
        div.style.opacity = '1';
        div.style.transform = targetElement ? 'translate(-50%, 0)' : 'translateY(0)';

        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transform = targetElement ? 'translate(-50%, 10px)' : 'translateY(10px)';
            setTimeout(() => div.remove(), 300);
        }, 3000);
    }

    // Função para simular carregamento
    function simularCarregamento(callback, tempo = 1500) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay-carregamento';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #805AD5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        overlay.appendChild(spinner);
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
            if (callback) callback();
        }, tempo);
    }

    // Inicialização baseada na página atual
    document.addEventListener("DOMContentLoaded", function () {
        const paginaAtual = window.location.pathname;
        
        // Inicializar elementos comuns do cabeçalho
        inicializarCabecalho();

        // Inicializar funcionalidades específicas da página
        if (paginaAtual.includes('login.html')) {
            inicializarLogin();
        } else if (paginaAtual.includes('criar-conta.html')) {
            inicializarCriarConta();
        } else if (paginaAtual.includes('recuperacao-senha.html')) {
            inicializarRecuperacaoSenha();
        } else if (paginaAtual.includes('dashboard.html')) {
            inicializarDashboard();
        } else if (paginaAtual.includes('assinatura.html')) {
            inicializarAssinatura();
        } else if (paginaAtual.includes('validacao-localizacao.html')) {
            inicializarValidacaoLocalizacao();
        } else if (paginaAtual.includes('envio-documento.html')) {
            inicializarEnvioDocumento();
        } else if (paginaAtual.includes('pre-cadastro.html')) {
            inicializarPreCadastro();
        } else if (paginaAtual.includes('configuracoes.html')) {
            inicializarConfiguracoes();
        } else if (paginaAtual.includes('confirmacao-divergencia.html')) {
            inicializarConfirmacaoDivergencia();
        } else if (paginaAtual.includes('ajuda.html')) {
            inicializarAjuda();
        } else if (paginaAtual.includes('status-assinatura.html')) {
            inicializarStatusAssinatura();
        } else if (paginaAtual.includes('perfil.html')) {
            inicializarPerfil();
        }
    });

    // Inicialização do cabeçalho
    function inicializarCabecalho() {
        function findButtonWithIconClass(iconClass) {
            const buttons = document.querySelectorAll('.botao-menu');
            for (const button of buttons) {
                if (button.querySelector(`.${iconClass}`)) {
                    return button;
                }
            }
            return null;
        }

        const botaoPerfil = findButtonWithIconClass('fa-user');
        const botaoSair = findButtonWithIconClass('fa-sign-out-alt');
        const menuLateral = document.querySelector('.barra-lateral');

        if (botaoPerfil) {
            botaoPerfil.addEventListener('click', () => {
                window.location.href = 'perfil.html';
            });
        }

        if (botaoSair) {
            botaoSair.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }

        // Atualizar texto do menu lateral
        if (menuLateral) {
            const links = menuLateral.querySelectorAll('a');
            links.forEach(link => {
                if (link.querySelector('.fa-shield-alt')) {
                    const span = link.querySelector('span');
                    if (span) span.textContent = 'Configurações';
                    link.href = 'configuracoes.html';
                }
            });
        }
    }

    // Login
    function inicializarLogin() {
        const form = document.querySelector('form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            const senha = form.querySelector('input[type="password"]').value;

            if (!email || !senha) {
                mostrarAlerta('Preencha todos os campos', 'error');
                return;
            }

            simularCarregamento(() => {
                mostrarAlerta('Login realizado com sucesso!');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            });
        });

        // Toggle de visibilidade da senha
        const botaoAlternarSenha = form.querySelector('.alternar-senha');
        if (botaoAlternarSenha) {
            botaoAlternarSenha.addEventListener('click', () => {
                const campoSenha = form.querySelector('input[type="password"]');
                const tipoAtual = campoSenha.type;
                campoSenha.type = tipoAtual === 'password' ? 'text' : 'password';
                
                const icone = botaoAlternarSenha.querySelector('i');
                icone.className = tipoAtual === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye';
            });
        }
    }

    // Criar Conta
    function inicializarCriarConta() {
        const form = document.querySelector('form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required]');
            let valido = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valido = false;
                }
            });

            if (!valido) {
                mostrarAlerta('Preencha todos os campos obrigatórios', 'error');
                return;
            }

            simularCarregamento(() => {
                mostrarAlerta('Conta criada com sucesso!');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);
            });
        });
    }

    // Recuperação de Senha
    function inicializarRecuperacaoSenha() {
        const form = document.querySelector('form');
        if (!form) return;

        let tokenEnviado = false;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]');
            
            if (!tokenEnviado && email.value) {
                simularCarregamento(() => {
                    mostrarAlerta('Token enviado para seu email!');
                    tokenEnviado = true;
                    // Habilitar campos de token e nova senha
                    const camposToken = form.querySelectorAll('.campo-token, .campo-nova-senha');
                    camposToken.forEach(campo => campo.style.display = 'block');
                });
            } else {
                const token = form.querySelector('.campo-token input');
                const novaSenha = form.querySelector('.campo-nova-senha input');
                
                if (!token.value || !novaSenha.value) {
                    mostrarAlerta('Preencha todos os campos', 'error');
                    return;
                }

                simularCarregamento(() => {
                    mostrarAlerta('Senha alterada com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 500);
                });
            }
        });
    }

    // Dashboard
    function inicializarDashboard() {
        // Adicionar ícone de notificação
        const headerButtons = document.querySelector('.d-flex.align-items-center.gap-3');
        if (headerButtons) {
            const notifButton = document.createElement('button');
            notifButton.className = 'botao-menu';
            notifButton.innerHTML = `
                <div style="position: relative; display: inline-block; cursor: pointer;" title="1 notificação">
                    <i class="fas fa-bell" style="color: black; font-size: 16px; transition: color 0.3s;"></i>
                    <span style="
                        position: absolute;
                        top: -6px;
                        right: -6px;
                        background: transparent;
                        color: #6c63ff;
                        border-radius: 50%;
                        padding: 1px 4px;
                        font-size: 10px;
                        font-weight: bold;
                        line-height: 1;
                        min-width: 14px;
                        text-align: center;
                        box-shadow: none;
                    ">1</span>
                </div>
            `;
            notifButton.addEventListener('mouseenter', () => {
                const icon = notifButton.querySelector('i.fas.fa-bell');
                if (icon) icon.style.color = '#6c63ff';
            });
            notifButton.addEventListener('mouseleave', () => {
                const icon = notifButton.querySelector('i.fas.fa-bell');
                if (icon) icon.style.color = 'black';
            });
            notifButton.addEventListener('click', () => {
                window.location.href = 'confirmacao-divergencia.html';
            });
            headerButtons.insertBefore(notifButton, headerButtons.firstChild);
        }

        // Inicializar gráfico
        const containerGrafico = document.querySelector('.container-grafico');
        if (containerGrafico) {
            // Carregar Chart.js dinamicamente
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => {
                const canvas = document.createElement('canvas');
                containerGrafico.innerHTML = '';
                containerGrafico.appendChild(canvas);

                new Chart(canvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Facial', 'Voz', 'Localização', 'Biometria'],
                        datasets: [{
                            data: [30, 25, 25, 20],
                            backgroundColor: [
                                '#805AD5',
                                '#4FD1C5',
                                '#F6AD55',
                                '#FC8181'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            };
            document.head.appendChild(script);
        }

        // Adicionar eventos aos cards
        const cards = document.querySelectorAll('.cartao-painel');
        cards.forEach(card => {
            // Adicionar ícone de documento ao cartão "Novo Documento"
            const titulo = card.querySelector('h3').textContent;
            if (titulo.includes('Novo Documento')) {
                // Verifique se o ícone já existe para evitar duplicatas
                if (!card.querySelector('.fa-file-alt')) {
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-file-alt mr-2';
                    icon.style.color = '#6c63ff';
                    icon.style.fontSize = '38px';
                    icon.style.marginRight = '14px';
                    const h3 = card.querySelector('h3');
                    h3.prepend(icon);
                }
            }
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                if (titulo.includes('Novo Documento')) {
                    window.location.href = 'envio-documento.html';
                } else if (titulo.includes('Pendentes')) {
                    window.location.href = 'assinatura.html';
                } else if (titulo.includes('Finalizadas')) {
                    window.location.href = 'status-assinatura.html';
                }
            });
        });
    }

    // Assinatura
    function inicializarAssinatura() {
        const botaoVerificacaoFacial = document.getElementById('btn-verificacao-facial');
        const botaoGravacao = document.getElementById('btn-iniciar-gravacao');
        const botaoAssinar = document.getElementById('btn-assinar-documento');
        const gravacaoTexto = document.getElementById('gravacao-texto');

        if (botaoVerificacaoFacial) {
            botaoVerificacaoFacial.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Verificação facial concluída com sucesso!');
                });
            });
        }

        if (botaoGravacao) {
            let gravando = false;
            let segundos = 0;
            let timerInterval;

            function formatarTempo(segundos) {
                const minutos = Math.floor(segundos / 60);
                const seg = segundos % 60;
                return `${minutos.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
            }

            botaoGravacao.addEventListener('click', () => {
                if (!gravando) {
                    gravando = true;
                    segundos = 0;
                    gravacaoTexto.textContent = `Gravando... 00:00`;
                    botaoGravacao.classList.add('bg-red-600');
                    botaoGravacao.classList.remove('bg-purple-700');

                    timerInterval = setInterval(() => {
                        segundos++;
                        gravacaoTexto.textContent = `Gravando... ${formatarTempo(segundos)}`;
                    }, 1000);
                } else {
                    gravando = false;
                    clearInterval(timerInterval);
                    gravacaoTexto.textContent = 'Regravar';
                    botaoGravacao.classList.remove('bg-red-600');
                    botaoGravacao.classList.add('bg-purple-700');
                    mostrarAlerta('Gravação concluída!');
                }
            });
        }

        if (botaoAssinar) {
            botaoAssinar.addEventListener('click', () => {
                window.location.href = 'validacao-localizacao.html';
            });
        }
    }

        // Validação de Localização
        function inicializarValidacaoLocalizacao() {
            const containerMapa = document.querySelector('.container-mapa');
            if (containerMapa) {
                // Carregar mapa do Google Maps com o endereço fornecido
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                iframe.height = '450';
                iframe.style.border = '0';
                iframe.allowFullscreen = true;
                iframe.loading = 'lazy';
                iframe.referrerPolicy = 'no-referrer-when-downgrade';
                iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.584690392959!2d-46.5374573!3d-23.655039899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce43440d2fc06b%3A0xfcde5589dbebd693!2sLetsSign!5e0!3m2!1spt-BR!2sbr!4v1746919188790!5m2!1spt-BR!2sbr';
                containerMapa.innerHTML = ''; // Clear existing content
                containerMapa.appendChild(iframe);
            }
    
            // Localização Atual - simulação de carregamento e depois mostrar endereço
            const localizacaoAtualDiv = document.querySelector('.cartao-localizacao:nth-child(2) .detalhes-localizacao');
            if (localizacaoAtualDiv) {
                const loadingSpinner = localizacaoAtualDiv.querySelector('.carregamento-spinner');
                const loadingText = localizacaoAtualDiv.querySelector('span');
    
                // After 5 seconds, remove spinner and update text
                setTimeout(() => {
                    if (loadingSpinner) loadingSpinner.style.display = 'none';
                    if (loadingText) loadingText.textContent = 'Rua das Flores, 123, Jardim Primavera, São Paulo - SP, 01234-567';
                }, 5000);
            }
    
        // Status da Validação - update text and style after 7 seconds
        const statusValidationDiv = document.querySelector('.indicador-status.status-verificando');
        if (statusValidationDiv) {
            const iconLoading = document.createElement('i');
            iconLoading.className = 'fas fa-spinner fa-spin mr-2';
            statusValidationDiv.querySelector('p').appendChild(iconLoading);
    
            let statusTimeout = setTimeout(() => {
                statusValidationDiv.classList.remove('status-verificando');
                statusValidationDiv.classList.add('bg-success-subtle');
                const p = statusValidationDiv.querySelector('p');
                p.innerHTML = '<i class="fas fa-check-circle me-2"></i>Compatibilidade verificada!';
                p.style.color = '#198754'; // Bootstrap success color
            }, 6000);
    
            // Adicionar botão "Solicitar Nova Verificação" acima do botão "Concluir" e suas funcionalidades
            const statusCard = document.querySelector('.cartao-localizacao:last-child');
            if (statusCard) {
                const botaoNovaVerificacao = document.createElement('button');
botaoNovaVerificacao.className = 'botao-secundario-personalizado flex items-center justify-center text-purple-800 border-2 border-purple-600 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-purple-400 hover:shadow-sm';
                botaoNovaVerificacao.style.width = '100%';
                botaoNovaVerificacao.style.margin = '24px auto 16px auto';
botaoNovaVerificacao.innerHTML = '<i class="fas fa-redo" style="margin-right: 8px; color: #6b21a8;"></i><span style="font-size: 1rem; color: #6b21a8;">Solicitar Nova Verificação</span>';
botaoNovaVerificacao.style.borderColor = '#6b21a8';
    
                const botaoConcluir = document.createElement('button');
                botaoConcluir.className = 'botao-primario-personalizado bg-purple-700 text-white rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-purple-800 hover:shadow-sm';
                botaoConcluir.style.width = '100%';
                botaoConcluir.style.margin = '0 auto';
                botaoConcluir.style.display = 'block';
                botaoConcluir.textContent = 'Concluir';
                botaoConcluir.disabled = true;
    
                let concluirTimeout = setTimeout(() => {
                    botaoConcluir.disabled = false;
                }, 6000);
    
                botaoConcluir.addEventListener('click', () => {
                    mostrarAlerta('Assinatura enviada');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                });
    
                botaoNovaVerificacao.addEventListener('click', () => {
                    // Reset "Localização Atual" carregando spinner e texto
                    const localizacaoAtualDiv = document.querySelector('.cartao-localizacao:nth-child(2) .detalhes-localizacao');
                    if (localizacaoAtualDiv) {
                        const loadingSpinner = localizacaoAtualDiv.querySelector('.carregamento-spinner');
                        const loadingText = localizacaoAtualDiv.querySelector('span');
                        if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
                        if (loadingText) loadingText.textContent = 'Carregando localização atual...';
                    }
    
                    // Redefinir "Status da Validação" para estado de verificação
                    statusValidationDiv.classList.remove('status-verificado');
                    statusValidationDiv.classList.add('status-verificando');
                    const p = statusValidationDiv.querySelector('p');
                    p.innerHTML = 'Verificando compatibilidade de localização...';
                    const iconLoadingNew = document.createElement('i');
                    iconLoadingNew.className = 'fas fa-spinner fa-spin mr-2';
                    p.appendChild(iconLoadingNew);
                    p.classList.remove('text-green-700');
                    p.classList.add('text-yellow-700');
    
                    // Desabilitar o botão "Concluir" e redefinir o tempo limite
                    botaoConcluir.disabled = true;
                    clearTimeout(concluirTimeout);
                    concluirTimeout = setTimeout(() => {
                        botaoConcluir.disabled = false;
                    }, 6000);
    
                    // Redefinir o tempo limite de 6 segundos para atualização de status
                    clearTimeout(statusTimeout);
                    statusTimeout = setTimeout(() => {
                        statusValidationDiv.classList.remove('status-verificando');
                        statusValidationDiv.classList.add('status-verificado');
                        p.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Compatibilidade verificada!';
                        p.classList.remove('text-yellow-700');
                        p.classList.add('text-green-700');
                    }, 6000);
    
                    // Reset "Localização Atual" carregando remoção do spinner e atualização de texto após 5 segundos
                    setTimeout(() => {
                        if (localizacaoAtualDiv) {
                            const loadingSpinner = localizacaoAtualDiv.querySelector('.carregamento-spinner');
                            const loadingText = localizacaoAtualDiv.querySelector('span');
                            if (loadingSpinner) loadingSpinner.style.display = 'none';
                            if (loadingText) loadingText.textContent = 'Rua das Flores, 123, Jardim Primavera, São Paulo - SP, 01234-567';
                        }
                    }, 5000);
                });
    
                statusCard.appendChild(botaoNovaVerificacao);
                statusCard.appendChild(botaoConcluir);
            }
        }
        }

    // Função de utilidade para validação de CEP e preenchimento automático de endereço
    function initializeCepValidation(form) {
        const cepInput = form.querySelector('input[placeholder="00000-000"]');
        if (cepInput) {
            cepInput.addEventListener('blur', () => {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    const addressFields = form.querySelectorAll('input[placeholder*="Digite"], select');
                    addressFields.forEach(field => {
                        field.disabled = true;
                        field.value = 'Carregando...';
                    });

                    setTimeout(() => {
                        const addressData = {
                            logradouro: 'Avenida Paulista',
                            bairro: 'Bela Vista',
                            cidade: 'São Paulo',
                            estado: 'SP'
                        };

                        form.querySelector('input[placeholder*="rua"]').value = addressData.logradouro;
                        form.querySelector('input[placeholder*="bairro"]').value = addressData.bairro;
                        form.querySelector('input[placeholder*="cidade"]').value = addressData.cidade;
                        form.querySelector('select').value = addressData.estado;

                        addressFields.forEach(field => field.disabled = false);
                        mostrarAlerta('Endereço preenchido automaticamente!');
                    }, 1500);
                }
            });
        }
    }

    // Pré-Cadastro
    function inicializarPreCadastro() {
        const form = document.getElementById('preCadastroForm');
        if (!form) return;

        // Simulação de upload de arquivo
        document.querySelectorAll('.caixa-upload').forEach(box => {
            const fileInput = box.querySelector('input[type="file"]');
            const textElem = box.querySelector('p');
            const iconElem = box.querySelector('i');

            box.addEventListener('click', () => {
                if (fileInput) fileInput.click();
            });

            if (fileInput) {
                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        // Mostrar animação de carregamento
                        iconElem.className = 'fas fa-spinner fa-spin text-purple mb-2';
                        textElem.textContent = 'Processando...';

                        // Simular processo de upload
                        setTimeout(() => {
                            iconElem.className = 'fas fa-check-circle text-success mb-2';
                            textElem.textContent = file.name;
                            textElem.classList.add('text-success');
                            mostrarAlerta('Documento carregado com sucesso!');
                        }, 2000);
                    }
                });
            }
        });

        // Simulação de captura de selfie
        const btnTirarFoto = document.getElementById('btn-tirar-foto');
        if (btnTirarFoto) {
            btnTirarFoto.addEventListener('click', () => {
                const cameraBox = document.querySelector('.caixa-camera');
                const iconElem = cameraBox.querySelector('i');
                const textElem = cameraBox.querySelector('p');

                // Desativar botão e mostrar estado de processamento
                btnTirarFoto.disabled = true;
                btnTirarFoto.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';
                iconElem.className = 'fas fa-spinner fa-spin text-purple';
                textElem.textContent = 'Capturando...';

                // Simular captura de câmera
                setTimeout(() => {
                    iconElem.className = 'fas fa-check-circle text-success';
                    textElem.textContent = 'Selfie capturada com sucesso!';
                    textElem.classList.add('text-success');
                    btnTirarFoto.innerHTML = '<i class="fas fa-camera me-2"></i>Tirar Nova Foto';
                    btnTirarFoto.disabled = false;
                    mostrarAlerta('Selfie capturada com sucesso!');
                }, 2000);
            });
        }

        // Simulação de Gravação de Voz
        const btnGravarVoz = document.getElementById('btn-gravar-voz');
        if (btnGravarVoz) {
            let isRecording = false;
            let recordingTimer = null;
            let seconds = 0;

            btnGravarVoz.addEventListener('click', () => {
                const voiceBox = document.querySelector('.caixa-voz');
                const iconElem = voiceBox.querySelector('i');
                const textElem = voiceBox.querySelector('p');

                if (!isRecording) {
                    // Start recording
                    isRecording = true;
                    btnGravarVoz.innerHTML = '<i class="fas fa-stop me-2"></i>Parar Gravação';
                    btnGravarVoz.classList.add('btn-danger');
                    iconElem.className = 'fas fa-microphone text-danger mb-2';
                    
                    // Adicionar animação de gravação
                    voiceBox.classList.add('recording');
                    
                    // Iniciar cronômetro
                    seconds = 0;
                    recordingTimer = setInterval(() => {
                        seconds++;
                        textElem.textContent = `Gravando... ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
                    }, 1000);
                } else {
                    // Parar de gravar
                    isRecording = false;
                    clearInterval(recordingTimer);
                    btnGravarVoz.innerHTML = '<i class="fas fa-microphone me-2"></i>Gravar Voz';
                    btnGravarVoz.classList.remove('btn-danger');
                    voiceBox.classList.remove('recording');
                    
                    // Mostrar estado de sucesso
                    iconElem.className = 'fas fa-check-circle text-success mb-2';
                    textElem.textContent = 'Áudio gravado com sucesso!';
                    textElem.classList.add('text-success');
                    
                    mostrarAlerta(`Gravação concluída! Duração: ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`);
                }
            });
        }

        // autocompletar CEP
        const cepInput = form.querySelector('input[placeholder="00000-000"]');
        if (cepInput) {
            cepInput.addEventListener('blur', () => {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    // Desabilitar campos de endereço e mostrar estado de carregamento
                    const addressFields = form.querySelectorAll('input[placeholder*="Digite"], select');
                    addressFields.forEach(field => {
                        field.disabled = true;
                        field.value = 'Carregando...';
                    });

                    // Simular atraso de chamada de API
                    setTimeout(() => {
                        // Dados de endereço de amostra
                        const addressData = {
                            logradouro: 'Avenida Paulista',
                            bairro: 'Bela Vista',
                            cidade: 'São Paulo',
                            estado: 'SP'
                        };

                        // Fill address fields
                        form.querySelector('input[placeholder*="rua"]').value = addressData.logradouro;
                        form.querySelector('input[placeholder*="bairro"]').value = addressData.bairro;
                        form.querySelector('input[placeholder*="cidade"]').value = addressData.cidade;
                        form.querySelector('select').value = addressData.estado;

                        // Preencha os campos de endereço
                        addressFields.forEach(field => field.disabled = false);
                        mostrarAlerta('Endereço preenchido automaticamente!');
                    }, 1500);
                }
            });
        }

        // Validação e Envio de Formulários
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validação básica de formulário
                const requiredFields = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                if (!isValid) {
                    mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }

                // Simular envio de formulário
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';

                setTimeout(() => {
                    mostrarAlerta('Pré-cadastro realizado com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }, 2000);
            });
        }


        // tooltips para ícones de informação
        const infoIcons = document.querySelectorAll('.info-icon');
        infoIcons.forEach(icon => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = icon.getAttribute('data-tooltip');
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = '#333';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s';
            icon.style.position = 'relative';
            icon.appendChild(tooltip);

            icon.addEventListener('mouseenter', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
                tooltip.style.bottom = '100%';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.marginBottom = '5px';
            });

            icon.addEventListener('mouseleave', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        });

        // Validação de formulário habilitando botão de envio somente quando todos os campos obrigatórios forem preenchidos
        function validarFormulario() {
            const inputsObrigatorios = form.querySelectorAll('input[required], select[required]');
            let valido = true;
            inputsObrigatorios.forEach(input => {
                if (!input.value.trim()) {
                    valido = false;
                }
            });
            // Removida a referência botaoConcluir.disabled para corrigir o erro
        }

        form.addEventListener('input', validarFormulario);
        validarFormulario();

        // Submit handler
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Enviar';
        }

        // Adicione estilos de validação personalizados
        const style = document.createElement('style');
        style.textContent = `
            .is-invalid {
                border-color: #dc3545 !important;
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
                background-repeat: no-repeat;
                background-position: right calc(0.375em + 0.1875rem) center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
            }
            .invalid-feedback {
                display: none;
                color: #dc3545;
                font-size: 0.875em;
                margin-top: 0.25rem;
            }
            .was-validated .form-control:invalid ~ .invalid-feedback,
            .was-validated .form-control.is-invalid ~ .invalid-feedback {
                display: block;
            }
            .upload-box.is-invalid {
                border-color: #dc3545 !important;
            }
            .biometric-box.is-invalid {
                border: 1px solid #dc3545 !important;
            }
        `;
        document.head.appendChild(style);

        // Adicione novalidate ao formulário para manipular a validação manualmente
        form.setAttribute('novalidate', '');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Remover quaisquer classes de validação existentes
            form.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            
            // Verifica a validade do formulário
            const isValid = form.checkValidity();
            form.classList.add('was-validated');
            
            if (!isValid) {
                // Show validation messages for invalid fields
                form.querySelectorAll(':invalid').forEach(field => {
                    field.classList.add('is-invalid');
                    const feedback = field.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.style.display = 'block';
                    }
                });
                
                // Mostrar alerta de erro
                mostrarAlerta('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
                return;
            }
            
            // Obtenha todos os campos obrigatórios
            const requiredInputs = form.querySelectorAll('input[required], select[required]');
            const requiredFiles = form.querySelectorAll('.caixa-upload input[type="file"]');
            const selfieBox = form.querySelector('.caixa-camera');
            const voiceBox = form.querySelector('.caixa-voz');
            
            let allFieldsFilled = true;
            let allFilesUploaded = true;
            let biometricsComplete = true;
            
            // Verifique as entradas de texto e selecione
            requiredInputs.forEach(field => {
                if (!field.checkValidity()) {
                    allFieldsFilled = false;
                    field.classList.add('is-invalid');
                    const feedback = field.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.style.display = 'block';
                    }
                } else {
                    field.classList.remove('is-invalid');
                    const feedback = field.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.style.display = 'none';
                    }
                }
            });
            
            // Verifique uploads de documentos
            requiredFiles.forEach(fileInput => {
                const uploadBox = fileInput.closest('.caixa-upload');
                if (!fileInput.files || fileInput.files.length === 0) {
                    allFilesUploaded = false;
                    uploadBox.classList.add('is-invalid');
                    uploadBox.style.borderColor = '#dc3545';
                } else {
                    uploadBox.classList.remove('is-invalid');
                    uploadBox.style.borderColor = '';
                }
            });

            // Verifique dados biométricos
            if (selfieBox && !selfieBox.querySelector('.text-success')) {
                biometricsComplete = false;
                selfieBox.classList.add('is-invalid');
            }
            if (voiceBox && !voiceBox.querySelector('.text-success')) {
                biometricsComplete = false;
                voiceBox.classList.add('is-invalid');
            }

            // Prossiga somente se todas as validações forem aprovadas
            if (allFieldsFilled && allFilesUploaded && biometricsComplete) {
                const btnConcluir = document.getElementById('btn-concluir');
                if (btnConcluir) {
                    btnConcluir.disabled = true;
                    btnConcluir.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                }
                mostrarAlerta('Documento Enviado');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                let errorMessage = 'Por favor, verifique os seguintes itens:';
                if (!allFieldsFilled) errorMessage += '\n- Preencha todos os campos obrigatórios';
                if (!allFilesUploaded) errorMessage += '\n- Faça o upload dos documentos de identificação';
                if (!biometricsComplete) errorMessage += '\n- Complete os dados biométricos (foto e voz)';
                
                mostrarAlerta(errorMessage, 'error');
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }

    // Configurações
    function inicializarConfiguracoes() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                simularCarregamento(() => {
                    mostrarAlerta('Configurações salvas com sucesso!');
                });
            });
        }
    }

    // Confirmação de Divergência
    function inicializarConfirmacaoDivergencia() {
        console.log('Inicializando confirmacao divergencia');
        const botaoAprovar = document.getElementById('btn-aprovar');
        const botaoRejeitar = document.getElementById('btn-rejeitar');

        if (botaoAprovar) {
            botaoAprovar.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Assinatura aprovada');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                });
            });
        } else {
            console.log('Botao Aprovar não encontrado');
        }

        if (botaoRejeitar) {
            botaoRejeitar.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Assinatura rejeitada', 'error');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                });
            });
        } else {
            console.log('Botao Rejeitar não encontrado');
        }
    }

    // Ajuda
    function inicializarAjuda() {
        const formContato = document.querySelector('form');
        if (formContato) {
            formContato.addEventListener('submit', (e) => {
                e.preventDefault();
                const campos = formContato.querySelectorAll('input[required], textarea[required]');
                let valido = true;
                campos.forEach(campo => {
                    if (!campo.value.trim()) valido = false;
                });

                if (valido) {
                    simularCarregamento(() => {
                        mostrarAlerta('Mensagem enviada com sucesso!');
                        formContato.reset();
                    });
                } else {
                    mostrarAlerta('Preencha todos os campos obrigatórios', 'error');
                }
            });
        }
    }

    // Status Assinatura
    function inicializarStatusAssinatura() {
        const botaoNovoDoc = document.querySelector('button:contains("Novo Documento")');
        if (botaoNovoDoc) {
            botaoNovoDoc.addEventListener('click', () => {
                window.location.href = 'envio-documento.html';
            });
        }

        // Adicionar funcionalidade de filtro e busca se existirem
        const inputBusca = document.querySelector('input[type="search"]');
        if (inputBusca) {
            inputBusca.addEventListener('input', (e) => {
                const termo = e.target.value.toLowerCase();
                const linhas = document.querySelectorAll('tbody tr');
                linhas.forEach(linha => {
                    const texto = linha.textContent.toLowerCase();
                    linha.style.display = texto.includes(termo) ? '' : 'none';
                });
            });
        }
    }

    // Perfil
    function inicializarPerfil() {
        const botaoAlterarFoto = document.getElementById('btn-alterar-foto');
        const botaoSalvar = document.getElementById('btn-salvar-alteracoes');
        const inputFoto = document.createElement('input');
        inputFoto.type = 'file';
        inputFoto.accept = 'image/*';
        inputFoto.style.display = 'none';
        document.body.appendChild(inputFoto);

        if (botaoAlterarFoto) {
            botaoAlterarFoto.addEventListener('click', () => {
                inputFoto.click();
            });

            inputFoto.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imgPerfil = document.querySelector('.foto-perfil img');
                        if (imgPerfil) {
                            imgPerfil.src = e.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (botaoSalvar) {
            botaoSalvar.addEventListener('click', (e) => {
                e.preventDefault();
                simularCarregamento(() => {
                    mostrarAlerta('Alterações salvas com sucesso!');
                });
            });
        }
    }

    // Inicializar Envio Documento
    function inicializarEnvioDocumento() {
        const areaUpload = document.querySelector('.area-upload');
        const inputFile = document.getElementById('documentUpload');

        if (!areaUpload || !inputFile) return;

        // Create element to show selected file name
        let fileNameDisplay = document.createElement('p');
        fileNameDisplay.className = 'nome-arquivo-selecionado';
        fileNameDisplay.style.marginTop = '10px';
        fileNameDisplay.style.color = '#6b21a8';
        fileNameDisplay.style.fontWeight = '600';
        areaUpload.appendChild(fileNameDisplay);

        // Clique em áreaUpload aciona entrada de arquivo clique
        areaUpload.addEventListener('click', () => {
            inputFile.click();
        });

        // Lidar com a seleção de arquivos
        inputFile.addEventListener('change', () => {
            const file = inputFile.files[0];
            if (file) {
                // Simule o carregamento com a barra de progresso dentro da área de upload
                fileNameDisplay.textContent = '';
                areaUpload.classList.remove('arquivo-selecionado');

                // Criar contêiner de barra de progresso
                let progressBarContainer = document.createElement('div');
                progressBarContainer.className = 'progress-bar-container';
                progressBarContainer.style.position = 'relative';
                progressBarContainer.style.width = '100%';
                progressBarContainer.style.height = '6px';
                progressBarContainer.style.backgroundColor = '#e5e7eb';
                progressBarContainer.style.borderRadius = '4px';
                progressBarContainer.style.marginTop = '10px';

                // Criar barra de progresso
                let progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.style.width = '0%';
                progressBar.style.height = '100%';
                progressBar.style.backgroundColor = '#6b21a8';
                progressBar.style.borderRadius = '4px';
                progressBar.style.transition = 'width 0.3s ease';

                progressBarContainer.appendChild(progressBar);

                // Remover a barra de progresso existente ou a exibição do nome do arquivo, se houver
                const existingProgress = areaUpload.querySelector('.progress-bar-container');
                if (existingProgress) {
                    existingProgress.remove();
                }
                const existingFileName = areaUpload.querySelector('.nome-arquivo-selecionado');
                if (existingFileName) {
                    existingFileName.textContent = '';
                }

                areaUpload.appendChild(progressBarContainer);

                let progress = 0;
                const interval = setInterval(() => {
                    progress += 5;
                    progressBar.style.width = progress + '%';

                    if (progress >= 100) {
                        clearInterval(interval);
                        progressBarContainer.remove();
                        mostrarAlerta(`Arquivo "${file.name}" carregado com sucesso!`);
                        fileNameDisplay.textContent = file.name;
                        areaUpload.classList.add('arquivo-selecionado');
                    }
                }, 100);
            } else {
                fileNameDisplay.textContent = '';
                areaUpload.classList.remove('arquivo-selecionado');
            }
        });

        // Validação e navegação no envio do formulário
        const form = document.getElementById('sendDocumentForm');
        const alertContainer = document.getElementById('alert-container');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alertContainer.textContent = '';

            // Validar entrada de arquivo
            if (!inputFile.files || inputFile.files.length === 0) {
            alertContainer.textContent = 'Por favor, selecione um arquivo PDF.';
            alertContainer.style.display = 'block';
            return;
        }

            // Validar entradas de texto e selecionar
            const textInputs = form.querySelectorAll('input[type="text"], input[type="email"]');
            for (const input of textInputs) {
                if (!input.value.trim()) {
            alertContainer.textContent = 'Por favor, preencha todos os campos de texto.';
            alertContainer.style.display = 'block';
            return;
        }
            }

            const select = form.querySelector('select.entrada-personalizada');
            if (!select.value) {
            alertContainer.textContent = 'Por favor, selecione um estado.';
            alertContainer.style.display = 'block';
            return;
        }

            // Validar botões de opção
            const radios = form.querySelectorAll('input[name="metodo-autenticacao"]');
            let radioChecked = false;
            for (const radio of radios) {
                if (radio.checked) {
                    radioChecked = true;
                    break;
                }
            }
            if (!radioChecked) {
            alertContainer.textContent = 'Por favor, selecione um método de autenticação.';
            alertContainer.style.display = 'block';
            return;
        }

            // Se todas as validações forem aprovadas, navegue até pre-cadastro.html
            window.location.href = 'pre-cadastro.html';
        });

        // Inicializar validação do CEP
        initializeCepValidation(form);
    }
})();
