export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#79A7DD] to-[#415A77] bg-clip-text text-transparent">
                        Políticas de Privacidade
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Informações que Coletamos</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">1.1 Informações Pessoais</h3>
                            <p>
                                Coletamos informações pessoais que você nos fornece voluntariamente ao se registrar em nosso site, 
                                fazer uma compra, ou entrar em contato conosco. Isso pode incluir:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Nome completo</li>
                                <li>Endereço de email</li>
                                <li>Número de telefone</li>
                                <li>Endereço de entrega e cobrança</li>
                                <li>Informações de pagamento (processadas de forma segura)</li>
                                <li>Preferências de produtos</li>
                            </ul>
                        </div>

                        <div className="space-y-4 mt-6">
                            <h3 className="text-xl font-medium text-gray-200">1.2 Informações de Uso</h3>
                            <p>
                                Coletamos automaticamente certas informações sobre como você usa nosso site, incluindo:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Endereço IP</li>
                                <li>Tipo de navegador e versão</li>
                                <li>Páginas visitadas</li>
                                <li>Tempo gasto no site</li>
                                <li>Referências de outros sites</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Como Usamos Suas Informações</h2>
                        <p className="mb-4">Utilizamos as informações coletadas para:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Processar e entregar seus pedidos</li>
                            <li>Fornecer suporte ao cliente</li>
                            <li>Personalizar sua experiência no site</li>
                            <li>Enviar comunicações sobre produtos e serviços</li>
                            <li>Melhorar nossos produtos e serviços</li>
                            <li>Detectar e prevenir fraudes</li>
                            <li>Cumprir obrigações legais</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. Compartilhamento de Informações</h2>
                        <p className="mb-4">
                            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Com prestadores de serviços que nos ajudam a operar nosso site e conduzir nossos negócios</li>
                            <li>Quando necessário para cumprir a lei ou proteger nossos direitos</li>
                            <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
                            <li>Com seu consentimento explícito</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">4. Cookies e Tecnologias Similares</h2>
                        <p className="mb-4">
                            Usamos cookies e tecnologias similares para melhorar sua experiência em nosso site. 
                            Os cookies são pequenos arquivos de dados armazenados em seu dispositivo que nos ajudam a:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Lembrar suas preferências e configurações</li>
                            <li>Analisar o tráfego do site</li>
                            <li>Personalizar conteúdo e anúncios</li>
                            <li>Facilitar o processo de compra</li>
                        </ul>
                        <p className="mt-4">
                            Você pode configurar seu navegador para recusar cookies, mas isso pode afetar 
                            a funcionalidade do site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">5. Segurança dos Dados</h2>
                        <p>
                            Implementamos medidas de segurança apropriadas para proteger suas informações pessoais 
                            contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2 mt-4">
                            <li>Criptografia SSL para transmissão de dados</li>
                            <li>Sistemas de firewall e monitoramento</li>
                            <li>Acesso restrito às informações pessoais</li>
                            <li>Treinamento regular de funcionários sobre segurança</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">6. Seus Direitos</h2>
                        <p className="mb-4">Você tem o direito de:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Acessar as informações pessoais que temos sobre você</li>
                            <li>Corrigir informações incorretas ou incompletas</li>
                            <li>Solicitar a exclusão de suas informações pessoais</li>
                            <li>Retirar o consentimento para o processamento de dados</li>
                            <li>Portabilidade de dados</li>
                            <li>Objetar ao processamento de suas informações</li>
                        </ul>
                        <p className="mt-4">
                            Para exercer esses direitos, entre em contato conosco através do email: 
                            <span className="text-blue-400"> privacidade@ekhytera.com</span>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">7. Retenção de Dados</h2>
                        <p>
                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os 
                            propósitos descritos nesta política, a menos que um período de retenção mais longo 
                            seja exigido ou permitido por lei.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">8. Menores de Idade</h2>
                        <p>
                            Nosso site não é direcionado a menores de 18 anos. Não coletamos conscientemente 
                            informações pessoais de menores de 18 anos. Se descobrirmos que coletamos informações 
                            de um menor, tomaremos medidas para excluir essas informações.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">9. Alterações nesta Política</h2>
                        <p>
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                            alterações significativas publicando a nova política em nosso site com uma nova data 
                            de "última atualização".
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">10. Contato</h2>
                        <p className="mb-4">
                            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
                        </p>
                        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                            <p className="mb-2"><strong>Email:</strong> privacidade@ekhytera.com</p>
                            <p className="mb-2"><strong>Telefone:</strong> (11) 9999-9999</p>
                            <p><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP - CEP: 01234-567</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-zinc-900 rounded-lg border border-zinc-800">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">
                            Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}