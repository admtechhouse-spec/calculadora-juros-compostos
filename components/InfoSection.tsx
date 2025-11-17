
import React from 'react';

export const InfoSection: React.FC = () => {
    return (
        <div className="space-y-6 prose max-w-none prose-h2:text-red-800 prose-h2:font-bold prose-h3:text-gray-700 prose-a:text-red-700">
            <h2>Entendendo a Calculadora de Juros Compostos</h2>
            <p>
                Utilizar nossa calculadora para projetar seus investimentos é um processo simples e intuitivo. Siga os passos abaixo para ver a mágica dos juros compostos em ação:
            </p>
            <ol>
                <li><strong>Valor Inicial:</strong> Insira a quantia que você já possui para iniciar o investimento. Se estiver começando do zero, pode deixar como 0.</li>
                <li><strong>Valor Mensal:</strong> Informe o valor que você planeja adicionar ao seu investimento todos os meses. A consistência é a chave para o crescimento.</li>
                <li><strong>Taxa de Juros:</strong> Defina a rentabilidade esperada do seu investimento. Você pode informá-la como uma taxa anual (a.a.) ou mensal (a.m.).</li>
                <li><strong>Período:</strong> Determine por quanto tempo você pretende deixar seu dinheiro investido, seja em meses ou anos.</li>
                <li><strong>Calcular:</strong> Com todos os campos preenchidos, clique em "Calcular" para visualizar sua projeção detalhada com gráficos e tabelas.</li>
            </ol>
            
            <h3>Qual é a fórmula e como se calculam os juros compostos?</h3>
            <p>
                A fórmula fundamental dos juros compostos para um único aporte é: <strong>M = C (1+i)^t</strong>, onde:
            </p>
            <ul>
                <li><strong>M:</strong> Montante final</li>
                <li><strong>C:</strong> Capital inicial investido</li>
                <li><strong>i:</strong> Taxa de juros (em formato decimal)</li>
                <li><strong>t:</strong> Tempo da aplicação</li>
            </ul>
            <p>
                Nossa calculadora expande essa fórmula para incluir aportes mensais, calculando o rendimento sobre o saldo acumulado a cada novo período, o que potencializa os ganhos. É crucial que a taxa de juros (i) e o tempo (t) estejam na mesma unidade (meses ou anos) para a precisão do cálculo.
            </p>
            
            <h3>Diferenças entre Juros Simples e Compostos</h3>
            <p>
                A principal distinção reside em como os juros são calculados. Os <strong>juros simples</strong> incidem apenas sobre o valor inicial. Em contraste, os <strong>juros compostos</strong>, ou "juros sobre juros", são calculados sobre o capital inicial somado aos juros já acumulados de períodos anteriores.
            </p>
            <p>
                Essa diferença cria um efeito "bola de neve" nos juros compostos, resultando em um crescimento exponencial do seu patrimônio no longo prazo. Como Albert Einstein supostamente disse: "Os juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha. Aquele que não entende, paga."
            </p>
        </div>
    );
};
