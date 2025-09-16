export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-24">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#79A7DD] to-[#415A77] bg-clip-text text-transparent">
                        Termos e Condições
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e usar o site da Ekhytera, você concorda em cumprir e estar vinculado a estes 
                            Termos e Condições de Uso. Se você não concordar com qualquer parte destes termos, 
                            não deve usar nosso site.
                        </p>
                        <p className="mt-4">
                            Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam 
                            ou usam o serviço.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Descrição do Serviço</h2>
                        <p className="mb-4">
                            A Ekhytera é uma plataforma online que oferece:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Venda de componentes de hardware para computadores</li>
                            <li>Serviços de montagem de PCs personalizados</li>
                            <li>Conteúdo educacional sobre tecnologia</li>
                            <li>Fórum de discussões técnicas</li>
                            <li>Suporte técnico especializado</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. Elegibilidade e Registro</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">3.1 Idade Mínima</h3>
                            <p>
                                Você deve ter pelo menos 18 anos de idade para usar nossos serviços. 
                                Menores de 18 anos podem usar o serviço apenas com supervisão parental.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">3.2 Informações de Registro</h3>
                            <p>
                                Ao criar uma conta, você concorda em fornecer informações precisas, 
                                atuais e completas, e manter essas informações atualizadas.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">3.3 Segurança da Conta</h3>
                            <p>
                                Você é responsável por manter a confidencialidade de sua senha e 
                                por todas as atividades que ocorrem em sua conta.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">4. Produtos e Preços</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">4.1 Disponibilidade</h3>
                            <p>
                                Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito 
                                de descontinuar qualquer produto a qualquer momento.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">4.2 Preços</h3>
                            <p>
                                Os preços estão sujeitos a alterações sem aviso prévio. O preço aplicável 
                                será aquele vigente no momento da confirmação do pedido.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">4.3 Especificações</h3>
                            <p>
                                Fazemos todos os esforços para garantir que as descrições e especificações 
                                dos produtos sejam precisas, mas não garantimos que estejam livres de erros.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">5. Pedidos e Pagamentos</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">5.1 Processamento de Pedidos</h3>
                            <p>
                                A confirmação do pedido será enviada por email. Reservamo-nos o direito 
                                de recusar ou cancelar pedidos por qualquer motivo.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">5.2 Métodos de Pagamento</h3>
                            <p>
                                Aceitamos cartões de crédito, débito, PIX e boleto bancário. 
                                Todos os pagamentos devem ser feitos em moeda brasileira (Real).
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">5.3 Segurança de Pagamento</h3>
                            <p>
                                Utilizamos sistemas de pagamento seguros e não armazenamos informações 
                                completas de cartão de crédito em nossos servidores.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">6. Entrega e Envio</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">6.1 Prazos de Entrega</h3>
                            <p>
                                Os prazos de entrega são estimativas e podem variar dependendo da localização 
                                e disponibilidade do produto. Não nos responsabilizamos por atrasos causados 
                                por transportadoras.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">6.2 Área de Entrega</h3>
                            <p>
                                Realizamos entregas em todo território nacional brasileiro. 
                                Taxas de entrega variam conforme a região.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">6.3 Inspeção na Entrega</h3>
                            <p>
                                Recomendamos inspecionar os produtos no momento da entrega. 
                                Danos aparentes devem ser relatados imediatamente.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">7. Garantias e Devoluções</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-200">7.1 Garantia do Produto</h3>
                            <p>
                                Todos os produtos possuem garantia do fabricante. Prazos e condições 
                                variam por produto e estão especificados na descrição de cada item.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">7.2 Direito de Arrependimento</h3>
                            <p>
                                Você tem o direito de cancelar a compra em até 7 dias corridos após 
                                o recebimento do produto, conforme o Código de Defesa do Consumidor.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-200">7.3 Produtos com Defeito</h3>
                            <p>
                                Produtos com defeito de fabricação serão trocados ou reparados 
                                conforme a política de garantia do fabricante.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">8. Uso Aceitável</h2>
                        <p className="mb-4">Você concorda em não usar nosso site para:</p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>Atividades ilegais ou não autorizadas</li>
                            <li>Transmitir vírus ou códigos maliciosos</li>
                            <li>Tentar acessar sistemas não autorizados</li>
                            <li>Interferir no funcionamento do site</li>
                            <li>Violar direitos de propriedade intelectual</li>
                            <li>Assediar, ameaçar ou intimidar outros usuários</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">9. Propriedade Intelectual</h2>
                        <p>
                            Todo o conteúdo do site, incluindo textos, gráficos, logos, imagens, 
                            e software, é propriedade da Ekhytera ou de seus licenciadores e está 
                            protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                        </p>
                        <p className="mt-4">
                            Você pode usar o conteúdo apenas para fins pessoais e não comerciais, 
                            conforme permitido por estes termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">10. Limitação de Responsabilidade</h2>
                        <p>
                            A Ekhytera não será responsável por danos indiretos, incidentais, 
                            especiais ou consequenciais decorrentes do uso ou incapacidade de usar 
                            nossos serviços, mesmo que tenhamos sido avisados da possibilidade de tais danos.
                        </p>
                        <p className="mt-4">
                            Nossa responsabilidade total não excederá o valor pago pelo produto ou serviço 
                            específico que deu origem à reclamação.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">11. Modificações dos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                            Alterações significativas serão comunicadas através do site ou por email. 
                            O uso continuado do site após as modificações constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">12. Rescisão</h2>
                        <p>
                            Podemos encerrar ou suspender sua conta e acesso ao site imediatamente, 
                            sem aviso prévio, se você violar estes termos. Você também pode encerrar 
                            sua conta a qualquer momento entrando em contato conosco.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">13. Lei Aplicável</h2>
                        <p>
                            Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
                            resolvida nos tribunais competentes do Brasil, preferencialmente na 
                            comarca de São Paulo, SP.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">14. Contato</h2>
                        <p className="mb-4">
                            Para dúvidas sobre estes Termos e Condições, entre em contato:
                        </p>
                        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                            <p className="mb-2"><strong>Email:</strong> legal@ekhytera.com</p>
                            <p className="mb-2"><strong>Telefone:</strong> (11) 9999-9999</p>
                            <p className="mb-2"><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP - CEP: 01234-567</p>
                            <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-zinc-900 rounded-lg border border-zinc-800">
                        <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-300">
                            Estes termos estão em conformidade com o Código de Defesa do Consumidor brasileiro
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}