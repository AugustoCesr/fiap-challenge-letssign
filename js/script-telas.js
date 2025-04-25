// JavaScript para tela 1 e tela 2

// Tela 1 - Upload de documentos
function inicializarTela1() {
    const inputArquivo = document.getElementById('input-arquivo');
    const areaUpload = document.querySelector('.texto-acao');
    const botaoEnviar = document.getElementById('botao-continuar');
    
    // Cria container para preview
    const previewContainer = document.createElement('div');
    previewContainer.style.marginTop = '10px';
    areaUpload.appendChild(previewContainer);

    // Cria barra de progresso
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
    areaUpload.appendChild(barraContainer);

    // Eventos
    areaUpload.addEventListener('click', () => inputArquivo.click());

    inputArquivo.addEventListener('change', (e) => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;

        // Validar arquivo
        if (!validarArquivo(arquivo)) return;

        // Mostrar preview
        mostrarPreview(arquivo);

        // Simular upload
        simularUpload();
    });

    function validarArquivo(arquivo) {
        const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
        const tamanhoMaximo = 5 * 1024 * 1024; // 5MB

        if (!tiposPermitidos.includes(arquivo.type)) {
            alert('Tipo de arquivo inválido. Use PDF, JPG ou PNG.');
            return false;
        }

        if (arquivo.size > tamanhoMaximo) {
            alert('Arquivo muito grande. Máximo 5MB.');
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
}

// Tela 2 - Pré-Cadastro
function inicializarTela2() {
    const uploadCards = document.querySelectorAll('.upload-card');
    const botaoGravar = document.querySelector('.botao-gravar');
    const tooltips = document.querySelectorAll('.icone-info');
    const form = document.querySelector('form.form-centralizado');
    const botaoConcluir = document.querySelector('.botao-concluir');
    const inputFotoRosto = document.getElementById('input-foto-rosto');
    const inputDocIdentidade = document.getElementById('input-doc-identidade');
    const cepInput = document.getElementById('cep');
    
    let gravando = false;
    let timerGravacao = null;

    // Configurar cards de upload
    uploadCards.forEach(card => {
        const barraContainer = document.createElement('div');
        barraContainer.style.cssText = `
            width: 100%;
            height: 4px;
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
        card.appendChild(barraContainer);

        // Eventos do card
        card.addEventListener('click', () => {
            if (card.getAttribute('aria-label').includes('Foto do rosto')) {
                inputFotoRosto.click();
            } else {
                inputDocIdentidade.click();
            }
        });

        const input = card.getAttribute('aria-label').includes('Foto do rosto') ? 
            inputFotoRosto : inputDocIdentidade;

        input.addEventListener('change', (e) => {
            if (!e.target.files.length) return;

            barraContainer.style.display = 'block';
            barra.style.width = '0%';

            let progresso = 0;
            const intervalo = setInterval(() => {
                progresso += 3;
                barra.style.width = `${progresso}%`;
                
                if (progresso >= 100) {
                    clearInterval(intervalo);
                    
                    // Mostrar sucesso
                    const icone = card.querySelector('i.fa-3x');
                    const textoUpload = card.querySelector('.texto-upload');
                    const textoOriginal = textoUpload.innerHTML;
                    
                    icone.className = 'fas fa-check-circle fa-3x';
                    icone.style.color = '#28a745';
                    textoUpload.textContent = card.getAttribute('aria-label').includes('Foto do rosto') ?
                        'Foto enviada com sucesso' : 'Documento enviado com sucesso';

                    // Restaurar após 3 segundos
                    setTimeout(() => {
                        icone.className = card.getAttribute('aria-label').includes('Foto do rosto') ?
                            'fas fa-camera fa-3x' : 'fas fa-id-card fa-3x';
                        icone.style.color = '#6c63ff';
                        textoUpload.innerHTML = textoOriginal;
                        barraContainer.style.display = 'none';
                        barra.style.width = '0%';
                    }, 3000);
                }
            }, 40);
        });
    });

    // Tooltips
    tooltips.forEach(tooltip => {
        const texto = tooltip.querySelector('.tooltip-texto');
        
        tooltip.addEventListener('mouseenter', () => {
            texto.classList.add('ativo');
            texto.setAttribute('aria-hidden', 'false');
        });

        tooltip.addEventListener('mouseleave', () => {
            texto.classList.remove('ativo');
            texto.setAttribute('aria-hidden', 'true');
        });
    });

    // Gravação de voz
    botaoGravar?.addEventListener('click', () => {
        if (!gravando) {
            gravando = true;
            let segundos = 0;
            botaoGravar.innerHTML = '<i class="fas fa-stop"></i> Parar';
            botaoGravar.classList.add('gravando');

            timerGravacao = setInterval(() => {
                segundos++;
                const minutos = Math.floor(segundos / 60);
                const segs = segundos % 60;
                botaoGravar.textContent = `Gravando... ${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
            }, 1000);
        } else {
            gravando = false;
            clearInterval(timerGravacao);
            botaoGravar.innerHTML = '<i class="fas fa-check"></i> Áudio simulado gravado';
            botaoGravar.classList.remove('gravando');

            setTimeout(() => {
                botaoGravar.innerHTML = '<i class="fas fa-microphone"></i> Regravar';
            }, 3000);
        }
    });

    // Busca CEP automática ao sair do campo
    cepInput?.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP inválido. Digite 8 números.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('estado').value = data.uf || '';
            document.getElementById('pais').value = 'Brasil';
        } catch (erro) {
            alert('Erro ao buscar CEP. Tente novamente.');
        }
    });

    // Validação do formulário
    const camposObrigatorios = [
        'nome-completo',
        'email',
        'endereco',
        'numero',
        'cep',
        'bairro',
        'estado',
        'pais'
    ].map(id => document.getElementById(id));

    camposObrigatorios.forEach(campo => {
        campo?.addEventListener('input', () => {
            if (campo.value.trim() === '') {
                campo.classList.add('campo-invalido');
            } else {
                campo.classList.remove('campo-invalido');
            }

            const todosPreenchidos = camposObrigatorios.every(c => c.value.trim() !== '');
            botaoConcluir.disabled = !todosPreenchidos;
        });
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const todosPreenchidos = camposObrigatorios.every(campo => campo.value.trim() !== '');
        if (!todosPreenchidos) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        alert('Pré-cadastro concluído com sucesso!');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.texto-acao')) {
        inicializarTela1();
    } else if (document.querySelector('.botao-gravar')) {
        inicializarTela2();
    }
});