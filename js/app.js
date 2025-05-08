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
        const botaoPerfil = document.querySelector('.botao-menu:has(.fa-user)');
        const botaoSair = document.querySelector('.botao-menu:has(.fa-sign-out-alt)');
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
            const linkConfig = menuLateral.querySelector('a:has(.fa-shield-alt)');
            if (linkConfig) {
                const span = linkConfig.querySelector('span');
                if (span) span.textContent = 'Configurações';
                linkConfig.href = 'configuracoes.html';
            }
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
            notifButton.innerHTML = '<i class="fas fa-bell"></i>';
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
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const titulo = card.querySelector('h3').textContent;
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
        const botaoVerificacaoFacial = document.querySelector('button:contains("Iniciar Verificação Facial")');
        const botaoGravacao = document.querySelector('button:contains("Iniciar Gravação")');
        const botaoAssinar = document.querySelector('button:contains("Assinar Documento")');

        if (botaoVerificacaoFacial) {
            botaoVerificacaoFacial.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Verificação facial concluída com sucesso!');
                });
            });
        }

        if (botaoGravacao) {
            botaoGravacao.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Gravação de voz concluída com sucesso!');
                });
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
        const containerMapa = document.querySelector('.mapa-container');
        if (containerMapa) {
            // Carregar mapa do OpenStreetMap
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '400';
            iframe.frameBorder = '0';
            iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=-46.6,-23.6,-46.5,-23.5&layer=mapnik';
            containerMapa.appendChild(iframe);
        }

        simularCarregamento(() => {
            mostrarAlerta('Localização detectada com sucesso!');
            const botaoConcluir = document.createElement('button');
            botaoConcluir.className = 'botao-primario-personalizado w-100 mt-4';
            botaoConcluir.textContent = 'Concluir';
            botaoConcluir.addEventListener('click', () => {
                window.location.href = 'dashboard.html';
            });
            document.querySelector('.container').appendChild(botaoConcluir);
        }, 2000);
    }

    // Envio de Documento
    function inicializarEnvioDocumento() {
        const dropZone = document.querySelector('.area-upload');
        const inputArquivo = document.querySelector('input[type="file"]');

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
                    if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
                        simularCarregamento(() => {
                            mostrarAlerta('Arquivo carregado com sucesso!');
                            dropZone.innerHTML = `<p>Arquivo selecionado: ${file.name}</p>`;
                        });
                    } else {
                        mostrarAlerta('Por favor, selecione um arquivo PDF de até 10MB', 'error');
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
        const botaoAvancar = document.querySelector('button[type="submit"]');
        if (botaoAvancar) {
            botaoAvancar.addEventListener('click', (e) => {
                e.preventDefault();
                const campos = document.querySelectorAll('input[required]');
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
        // Manipulação de arquivos RG/CNH
        const inputsArquivo = document.querySelectorAll('input[type="file"]');
        inputsArquivo.forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    simularCarregamento(() => {
                        mostrarAlerta('Arquivo carregado com sucesso!');
                    });
                }
            });
        });

        // Botão Tirar Foto
        const botaoFoto = document.querySelector('button:contains("Tirar foto")');
        if (botaoFoto) {
            botaoFoto.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Foto capturada com sucesso!');
                });
            });
        }

        // Botão Gravar Voz
        const botaoGravar = document.querySelector('button:contains("Gravar voz")');
        if (botaoGravar) {
            botaoGravar.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Áudio gravado com sucesso!');
                });
            });
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

        // Botão Concluir
        const botaoConcluir = document.querySelector('button[type="submit"]');
        if (botaoConcluir) {
            botaoConcluir.textContent = 'Concluir';
            botaoConcluir.addEventListener('click', (e) => {
                e.preventDefault();
                simularCarregamento(() => {
                    mostrarAlerta('Documento enviado com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                });
            });
        }
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
        const botaoAprovar = document.querySelector('button:contains("Aprovar")');
        const botaoRejeitar = document.querySelector('button:contains("Rejeitar")');

        if (botaoAprovar) {
            botaoAprovar.addEventListener('click', () => {
                simularCarregamento(() => {
                    mostrarAlerta('Assinatura aprovada');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                });
            });
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
        const botaoAlterarFoto = document.querySelector('button:contains("Alterar Foto")');
        const botaoSalvar = document.querySelector('button:contains("Salvar Alterações")');
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
