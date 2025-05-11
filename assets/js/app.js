(function () {
    "use strict";

    // Função para mostrar mensagens de alerta estilizadas
    function mostrarAlerta(mensagem, tipo = 'success') {
        const div = document.createElement('div');
        div.className = `alerta alerta-${tipo}`;
        div.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 9999;
            animation: slideIn 0.5s ease-in-out;
        `;
        div.style.backgroundColor = tipo === 'success' ? '#4CAF50' : '#f44336';
        div.style.color = 'white';
        div.textContent = mensagem;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.animation = 'slideOut 0.5s ease-in-out';
            setTimeout(() => div.remove(), 500);
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
            // Add document icon to "Novo Documento" card
            const titulo = card.querySelector('h3').textContent;
            if (titulo.includes('Novo Documento')) {
                // Check if icon already exists to avoid duplicates
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
                statusValidationDiv.classList.add('status-verificado');
                const p = statusValidationDiv.querySelector('p');
                p.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Compatibilidade verificada!';
                p.classList.remove('text-yellow-700');
                p.classList.add('text-green-700');
            }, 6000);
    
            // Add "Solicitar Nova Verificação" button above "Concluir" button and its functionality
            const statusCard = document.querySelector('.cartao-localizacao:last-child');
            if (statusCard) {
                const botaoNovaVerificacao = document.createElement('button');
                botaoNovaVerificacao.className = 'botao-secundario-personalizado w-full mb-4 flex items-center justify-center text-purple-700 border border-purple-700 rounded-lg px-4 py-2 text-base hover:bg-purple-50 hover:border-purple-700';
                botaoNovaVerificacao.innerHTML = '<i class="fas fa-redo mr-2"></i>Solicitar Nova Verificação';
    
                const botaoConcluir = document.createElement('button');
                botaoConcluir.className = 'botao-primario-personalizado w-full';
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
                    // Reset "Localização Atual" loading spinner and text
                    const localizacaoAtualDiv = document.querySelector('.cartao-localizacao:nth-child(2) .detalhes-localizacao');
                    if (localizacaoAtualDiv) {
                        const loadingSpinner = localizacaoAtualDiv.querySelector('.carregamento-spinner');
                        const loadingText = localizacaoAtualDiv.querySelector('span');
                        if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
                        if (loadingText) loadingText.textContent = 'Carregando localização atual...';
                    }
    
                    // Reset "Status da Validação" to verifying state
                    statusValidationDiv.classList.remove('status-verificado');
                    statusValidationDiv.classList.add('status-verificando');
                    const p = statusValidationDiv.querySelector('p');
                    p.innerHTML = 'Verificando compatibilidade de localização...';
                    const iconLoadingNew = document.createElement('i');
                    iconLoadingNew.className = 'fas fa-spinner fa-spin mr-2';
                    p.appendChild(iconLoadingNew);
                    p.classList.remove('text-green-700');
                    p.classList.add('text-yellow-700');
    
                    // Disable "Concluir" button and reset timeout
                    botaoConcluir.disabled = true;
                    clearTimeout(concluirTimeout);
                    concluirTimeout = setTimeout(() => {
                        botaoConcluir.disabled = false;
                    }, 6000);
    
                    // Reset the 6 seconds timeout for status update
                    clearTimeout(statusTimeout);
                    statusTimeout = setTimeout(() => {
                        statusValidationDiv.classList.remove('status-verificando');
                        statusValidationDiv.classList.add('status-verificado');
                        p.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Compatibilidade verificada!';
                        p.classList.remove('text-yellow-700');
                        p.classList.add('text-green-700');
                    }, 6000);
    
                    // Reset "Localização Atual" loading spinner removal and text update after 5 seconds
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

    // Envio de Documento
    function inicializarEnvioDocumento() {
        const dropZone = document.getElementById('area-upload');
        const inputArquivo = document.getElementById('documentUpload');
        const form = document.getElementById('sendDocumentForm');
        const botaoEnviar = document.getElementById('btn-enviar');

        // Criar container para preview
        const previewContainer = document.createElement('div');
        previewContainer.style.marginTop = '10px';
        dropZone.appendChild(previewContainer);

        // Criar barra de progresso
        const barraContainer = document.createElement('div');
        barraContainer.style.cssText = `
            width: 100%;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            margin-top: 15px;
            overflow: hidden;
            display: none;
        `;

        const barra = document.createElement('div');
        barra.style.cssText = `
            width: 0%;
            height: 100%;
            background: #6c63ff;
            border-radius: 4px;
            transition: width 0.5s linear;
        `;

        barraContainer.appendChild(barra);
        dropZone.appendChild(barraContainer);

        function validarArquivo(arquivo) {
            const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
            const tamanhoMaximo = 10 * 1024 * 1024; // 10MB

            if (!tiposPermitidos.includes(arquivo.type)) {
                mostrarAlerta('Tipo de arquivo inválido. Use PDF, JPG ou PNG.', 'error');
                return false;
            }

            if (arquivo.size > tamanhoMaximo) {
                mostrarAlerta('Arquivo muito grande. Máximo 10MB.', 'error');
                return false;
            }

            return true;
        }

        function mostrarPreview(arquivo) {
            previewContainer.innerHTML = '';

            const nome = document.createElement('p');
            nome.textContent = `Arquivo selecionado: ${arquivo.name}`;
            previewContainer.appendChild(nome);

            if (arquivo.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(arquivo);
                img.style.maxWidth = '150px';
                img.style.marginTop = '10px';
                previewContainer.appendChild(img);
            } else if (arquivo.type === 'application/pdf') {
                const icone = document.createElement('i');
                icone.className = 'fas fa-file-pdf fa-3x';
                icone.style.color = '#d9534f';
                icone.style.marginTop = '10px';
                previewContainer.appendChild(icone);
            }
        }

        function simularUpload() {
            barraContainer.style.display = 'block';
            barra.style.width = '0%';
            botaoEnviar.disabled = true;

            let progresso = 0;
            const intervalo = setInterval(() => {
                progresso += 3;
                barra.style.width = `${progresso}%`;

                if (progresso >= 100) {
                    clearInterval(intervalo);
                    botaoEnviar.disabled = false;
                }
            }, 40);
        }

        if (dropZone && inputArquivo) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, preventDefaults, false);
            });

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            dropZone.addEventListener('drop', handleDrop, false);
            inputArquivo.addEventListener('change', handleFileSelect);

            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handleFiles(files);
            }

            function handleFileSelect(e) {
                const files = e.target.files;
                handleFiles(files);
            }

            function handleFiles(files) {
                if (files[0]) {
                    const file = files[0];
                    if (validarArquivo(file)) {
                        mostrarPreview(file);
                        simularUpload();
                        simularCarregamento(() => {
                            mostrarAlerta('Arquivo carregado com sucesso!');
                        });
                    }
                }
            }
        }

        // Autopreenchimento de CEP
        const inputCep = document.querySelector('input[name="cep"]');
        if (inputCep) {
            inputCep.addEventListener('blur', () => {
                const cep = inputCep.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    simularCarregamento(() => {
                        // Simular preenchimento de endereço
                        document.querySelector('input[name="rua"]').value = 'Rua Exemplo';
                        document.querySelector('input[name="bairro"]').value = 'Bairro Exemplo';
                        document.querySelector('input[name="cidade"]').value = 'Cidade Exemplo';
                        document.querySelector('input[name="estado"]').value = 'SP';
                    });
                }
            });
        }

        // Botão Avançar
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const campos = form.querySelectorAll('input[required]');
                let valido = true;
                campos.forEach(campo => {
                    if (!campo.value.trim()) valido = false;
                });

                if (valido) {
                    window.location.href = 'pre-cadastro.html';
                } else {
                    mostrarAlerta('Preencha todos os campos obrigatórios', 'error');
                }
            });
        }
    }

    // Pré-Cadastro
    function inicializarPreCadastro() {
        const inputDocFrente = document.getElementById('input-doc-frente');
        const inputDocVerso = document.getElementById('input-doc-verso');
        const botaoTirarFoto = document.getElementById('btn-tirar-foto');
        const botaoGravarVoz = document.getElementById('btn-gravar-voz');
        const inputCep = document.getElementById('cep');
        const form = document.getElementById('preCadastroForm');
        const botaoConcluir = document.getElementById('btn-concluir');

        // Containers for upload cards
        const uploadCards = {
            frente: inputDocFrente.parentElement,
            verso: inputDocVerso.parentElement
        };

        // Create progress bars and success icons for upload cards
        function criarBarraProgresso(card) {
            const barraContainer = document.createElement('div');
            barraContainer.style.cssText = `
                width: 100%;
                height: 6px;
                background: #eee;
                border-radius: 4px;
                margin-top: 10px;
                overflow: hidden;
                display: none;
            `;
            const barra = document.createElement('div');
            barra.style.cssText = `
                width: 0%;
                height: 100%;
                background: #6c63ff;
                border-radius: 4px;
                transition: width 0.5s linear;
            `;
            barraContainer.appendChild(barra);
            card.appendChild(barraContainer);
            return { barraContainer, barra };
        }

        function criarIconeSucesso(card) {
            const icone = document.createElement('i');
            icone.className = 'fas fa-check-circle';
            icone.style.color = '#4CAF50';
            icone.style.fontSize = '24px';
            icone.style.position = 'absolute';
            icone.style.top = '10px';
            icone.style.right = '10px';
            icone.style.display = 'none';
            card.style.position = 'relative';
            card.appendChild(icone);
            return icone;
        }

        const progressoFrente = criarBarraProgresso(uploadCards.frente);
        const progressoVerso = criarBarraProgresso(uploadCards.verso);
        const iconeSucessoFrente = criarIconeSucesso(uploadCards.frente);
        const iconeSucessoVerso = criarIconeSucesso(uploadCards.verso);

        function validarArquivo(arquivo) {
            const tiposPermitidos = ['image/jpeg', 'image/png'];
            const tamanhoMaximo = 10 * 1024 * 1024; // 10MB

            if (!tiposPermitidos.includes(arquivo.type)) {
                mostrarAlerta('Tipo de arquivo inválido. Use JPG ou PNG.', 'error');
                return false;
            }

            if (arquivo.size > tamanhoMaximo) {
                mostrarAlerta('Arquivo muito grande. Máximo 10MB.', 'error');
                return false;
            }

            return true;
        }

        function simularUpload(progressoObj, iconeSucesso) {
            progressoObj.barraContainer.style.display = 'block';
            progressoObj.barra.style.width = '0%';

            let progresso = 0;
            const intervalo = setInterval(() => {
                progresso += 5;
                progressoObj.barra.style.width = `${progresso}%`;

                if (progresso >= 100) {
                    clearInterval(intervalo);
                    progressoObj.barraContainer.style.display = 'none';
                    iconeSucesso.style.display = 'block';
                }
            }, 50);
        }

        inputDocFrente.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && validarArquivo(file)) {
                uploadCards.frente.classList.add('tem-arquivo');
                simularUpload(progressoFrente, iconeSucessoFrente);
                mostrarAlerta('Arquivo RG/CNH - Frente carregado com sucesso!');
            } else {
                uploadCards.frente.classList.remove('tem-arquivo');
            }
        });

        inputDocVerso.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && validarArquivo(file)) {
                uploadCards.verso.classList.add('tem-arquivo');
                simularUpload(progressoVerso, iconeSucessoVerso);
                mostrarAlerta('Arquivo RG/CNH - Verso carregado com sucesso!');
            } else {
                uploadCards.verso.classList.remove('tem-arquivo');
            }
        });

        // Voice recording simulation
        let gravando = false;
        let timerInterval;
        let segundos = 0;

        function atualizarTimer() {
            const minutos = Math.floor(segundos / 60);
            const seg = segundos % 60;
            const timerDisplay = document.getElementById('timer-gravacao');
            if (timerDisplay) {
                timerDisplay.textContent = `${minutos.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
            }
        }

        botaoGravarVoz.addEventListener('click', () => {
            if (!gravando) {
                gravando = true;
                segundos = 0;
                botaoGravarVoz.textContent = 'Parar Gravação';
                if (!document.getElementById('timer-gravacao')) {
                    const timerSpan = document.createElement('span');
                    timerSpan.id = 'timer-gravacao';
                    timerSpan.style.marginLeft = '10px';
                    botaoGravarVoz.parentElement.appendChild(timerSpan);
                }
                atualizarTimer();
                timerInterval = setInterval(() => {
                    segundos++;
                    atualizarTimer();
                }, 1000);
            } else {
                gravando = false;
                botaoGravarVoz.textContent = 'Gravar Voz';
                clearInterval(timerInterval);
                mostrarAlerta('Gravação de voz concluída com sucesso!');
            }
        });

        // CEP auto-fill with API call and validation
        inputCep.addEventListener('blur', () => {
            const cep = inputCep.value.replace(/\D/g, '');
            if (cep.length !== 8) {
                mostrarAlerta('CEP inválido. Deve conter 8 dígitos.', 'error');
                return;
            }
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        mostrarAlerta('CEP não encontrado.', 'error');
                        return;
                    }
                    document.querySelector('input[placeholder="Digite o nome da rua"]').value = data.logradouro || '';
                    document.querySelector('input[placeholder="Digite o bairro"]').value = data.bairro || '';
                    document.querySelector('input[placeholder="Digite a cidade"]').value = data.localidade || '';
                    const estadoSelect = document.querySelector('select.entrada-personalizada');
                    if (estadoSelect) {
                        estadoSelect.value = data.uf || '';
                    }
                })
                .catch(() => {
                    mostrarAlerta('Erro ao buscar CEP.', 'error');
                });
        });

        // Tooltips for info icons
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

        // Form validation enabling submit button only when all required fields are filled
        function validarFormulario() {
            const inputsObrigatorios = form.querySelectorAll('input[required], select[required]');
            let valido = true;
            inputsObrigatorios.forEach(input => {
                if (!input.value.trim()) {
                    valido = false;
                }
            });
            botaoConcluir.disabled = !valido;
        }

        form.addEventListener('input', validarFormulario);
        validarFormulario();

        // Submit handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            simularCarregamento(() => {
                mostrarAlerta('Documento enviado com sucesso!');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            });
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

})();
