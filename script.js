// Função para calcular a soma dos dígitos de um número
function sumDigits(number) {
    let sum = 0;
    const digits = Math.abs(number).toString().split('');
    
    for (const digit of digits) {
        sum += parseInt(digit, 10);
    }
    
    return sum;
}

// Função para gerar a sequência mágica
function generateMagicSequence(A, B, n) {
    const sequence = [A, B];
    let calculationSteps = `Sequência inicial: [${A}, ${B}]\n`;
    
    for (let i = 2; i < n; i++) {
        const prev1 = sequence[i - 2];
        const prev2 = sequence[i - 1];
        
        // Calcula a soma dos dígitos dos dois números anteriores
        const sumPrevDigits = sumDigits(prev1) + sumDigits(prev2);
        const nextNumber = sumDigits(sumPrevDigits);
        
        sequence.push(nextNumber);
        
        // Adiciona os passos do cálculo para exibição
        calculationSteps += `Passo ${i - 1}: ${prev1} + ${prev2} → Soma dos dígitos: ${sumDigits(prev1)} + ${sumDigits(prev2)} = ${sumPrevDigits} → ${nextNumber}\n`;
    }
    
    return {
        result: sequence[n - 1],
        calculation: calculationSteps
    };
}

// Função principal que é executada quando o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    const decipherBtn = document.getElementById('decipherBtn');
    const returnBtn = document.getElementById('returnBtn');
    const resultElement = document.getElementById('result');
    const calculationElement = document.getElementById('calculation');
    
    // Função para decifrar a sequência
    function decipherSequence() {
        const A = parseInt(document.getElementById('numberA').value, 10);
        const B = parseInt(document.getElementById('numberB').value, 10);
        const n = parseInt(document.getElementById('numberN').value, 10);
        
        // Validação simples
        if (isNaN(A) || isNaN(B) || isNaN(n) || n < 1 || n > 20) {
            resultElement.textContent = 'Por favor, insira valores válidos (1 ≤ n ≤ 20)';
            calculationElement.textContent = '';
            return;
        }
        
        // Gera a sequência mágica
        const { result, calculation } = generateMagicSequence(A, B, n);
        
        // Exibe os resultados
        resultElement.textContent = `O ${n}º número da sequência é: ${result}`;
        calculationElement.textContent = calculation;
    }
    
    // Função para resetar os campos
    function resetFields() {
        document.getElementById('numberA').value = '9';
        document.getElementById('numberB').value = '5';
        document.getElementById('numberN').value = '4';
        resultElement.textContent = '';
        calculationElement.textContent = '';
    }
    
    // Adiciona os event listeners aos botões
    decipherBtn.addEventListener('click', decipherSequence);
    returnBtn.addEventListener('click', resetFields);
    
    // Permite pressionar Enter para decifrar
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            decipherSequence();
        }
    });
});