import type { CartItem, ContactData } from "@/contexts/cart-context"

const urgencyLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  critical: "Crítica",
}

export function generateEmailTemplate(items: CartItem[], contactData: ContactData): string {
  const criticalItems = items.filter((item) => item.urgency === "critical")
  const uniqueMachines = new Set(items.map((item) => item.machineId)).size

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nova Solicitação de Peças Industriais</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 30px; }
        .machine-item { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
        .urgency-critical { border-left: 4px solid #dc2626; }
        .urgency-high { border-left: 4px solid #f59e0b; }
        .urgency-medium { border-left: 4px solid #eab308; }
        .urgency-low { border-left: 4px solid #10b981; }
        .contact-info { background: #f9fafb; padding: 15px; border-radius: 8px; }
        .summary { background: #dbeafe; padding: 15px; border-radius: 8px; border: 1px solid #93c5fd; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
        .badge-critical { background: #fee2e2; color: #991b1b; }
        .badge-high { background: #fef3c7; color: #92400e; }
        .badge-medium { background: #fef08a; color: #a16207; }
        .badge-low { background: #d1fae5; color: #065f46; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔧 Nova Solicitação de Peças Industriais</h1>
        <p>Solicitação recebida em ${new Date().toLocaleString("pt-BR")}</p>
    </div>

    <div class="content">
        <!-- Resumo -->
        <div class="section">
            <div class="summary">
                <h2>📊 Resumo da Solicitação</h2>
                <ul>
                    <li><strong>Total de solicitações:</strong> ${items.length}</li>
                    <li><strong>Máquinas diferentes:</strong> ${uniqueMachines}</li>
                    <li><strong>Urgências críticas:</strong> ${criticalItems.length}</li>
                    <li><strong>Tempo de resposta esperado:</strong> ${criticalItems.length > 0 ? "2-4 horas" : "12-24 horas"}</li>
                </ul>
            </div>
        </div>

        <!-- Dados de Contato -->
        <div class="section">
            <h2>👤 Dados de Contato</h2>
            <div class="contact-info">
                <p><strong>Nome:</strong> ${contactData.fullName}</p>
                <p><strong>Empresa:</strong> ${contactData.company}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Telefone:</strong> ${contactData.phone}</p>
                ${contactData.whatsapp ? `<p><strong>WhatsApp:</strong> ${contactData.whatsapp}</p>` : ""}
                <p><strong>Endereço:</strong> ${contactData.city}, ${contactData.state} - CEP: ${contactData.zipCode}</p>
                ${contactData.maxBudget ? `<p><strong>Orçamento máximo:</strong> ${contactData.maxBudget}</p>` : ""}
                ${contactData.desiredDeadline ? `<p><strong>Prazo desejado:</strong> ${contactData.desiredDeadline}</p>` : ""}
                <p><strong>Preferência por peças certificadas:</strong> ${contactData.preferCertified ? "Sim" : "Não obrigatório"}</p>
            </div>
        </div>

        <!-- Solicitações de Peças -->
        <div class="section">
            <h2>🔧 Solicitações de Peças</h2>
            ${items
              .map(
                (item, index) => `
                <div class="machine-item urgency-${item.urgency}">
                    <h3>${item.machineName}</h3>
                    <p><strong>Marca/Modelo:</strong> ${item.machineBrand} • ${item.machineModel}</p>
                    
                    ${
                      item.serialNumber || item.manufacturingYear || item.operatingHours
                        ? `
                    <div style="margin: 10px 0;">
                        ${item.serialNumber ? `<p><strong>Número de Série:</strong> ${item.serialNumber}</p>` : ""}
                        ${item.manufacturingYear ? `<p><strong>Ano de Fabricação:</strong> ${item.manufacturingYear}</p>` : ""}
                        ${item.operatingHours ? `<p><strong>Horas de Uso:</strong> ${item.operatingHours}h</p>` : ""}
                    </div>
                    `
                        : ""
                    }
                    
                    <p><strong>Urgência:</strong> 
                        <span class="badge badge-${item.urgency}">${urgencyLabels[item.urgency]}</span>
                    </p>
                    
                    <p><strong>Categorias de Peças:</strong></p>
                    <ul>
                        ${item.partCategories.map((category) => `<li>${category}</li>`).join("")}
                    </ul>
                    
                    <p><strong>Descrição do Problema:</strong></p>
                    <p style="background: #f9fafb; padding: 10px; border-radius: 4px; font-style: italic;">
                        "${item.problemDescription}"
                    </p>
                    
                    ${
                      item.attachments.length > 0
                        ? `
                    <p><strong>Anexos:</strong></p>
                    <ul>
                        ${item.attachments.map((file) => `<li>📎 ${file.name}</li>`).join("")}
                    </ul>
                    `
                        : ""
                    }
                    
                    <p style="font-size: 12px; color: #6b7280;">
                        <strong>Adicionado:</strong> ${item.addedAt.toLocaleString("pt-BR")}
                    </p>
                </div>
            `,
              )
              .join("")}
        </div>

        <!-- Próximos Passos -->
        <div class="section">
            <h2>📋 Próximos Passos</h2>
            <ol>
                <li>Nossa equipe técnica analisará cada solicitação detalhadamente</li>
                <li>Verificaremos a disponibilidade das peças em nosso estoque</li>
                <li>Prepararemos um orçamento completo com preços e prazos</li>
                <li>Entraremos em contato ${criticalItems.length > 0 ? "em até 4 horas" : "em até 24 horas"}</li>
            </ol>
        </div>
    </div>

    <div class="footer">
        <p>IndustrialParts - Especialistas em Peças Industriais</p>
        <p>📧 contato@industrialparts.com | 📞 (11) 1234-5678</p>
        <p>Esta é uma mensagem automática. Por favor, não responda este email.</p>
    </div>
</body>
</html>
  `.trim()
}

export function generatePlainTextTemplate(items: CartItem[], contactData: ContactData): string {
  const criticalItems = items.filter((item) => item.urgency === "critical")
  const uniqueMachines = new Set(items.map((item) => item.machineId)).size

  return `
NOVA SOLICITAÇÃO DE PEÇAS INDUSTRIAIS
=====================================

Data/Hora: ${new Date().toLocaleString("pt-BR")}

RESUMO DA SOLICITAÇÃO
--------------------
• Total de solicitações: ${items.length}
• Máquinas diferentes: ${uniqueMachines}
• Urgências críticas: ${criticalItems.length}
• Tempo de resposta esperado: ${criticalItems.length > 0 ? "2-4 horas" : "12-24 horas"}

DADOS DE CONTATO
---------------
Nome: ${contactData.fullName}
Empresa: ${contactData.company}
Email: ${contactData.email}
Telefone: ${contactData.phone}
${contactData.whatsapp ? `WhatsApp: ${contactData.whatsapp}` : ""}
Endereço: ${contactData.city}, ${contactData.state} - CEP: ${contactData.zipCode}
${contactData.maxBudget ? `Orçamento máximo: ${contactData.maxBudget}` : ""}
${contactData.desiredDeadline ? `Prazo desejado: ${contactData.desiredDeadline}` : ""}
Preferência por peças certificadas: ${contactData.preferCertified ? "Sim" : "Não obrigatório"}

SOLICITAÇÕES DE PEÇAS
--------------------
${items
  .map(
    (item, index) => `
${index + 1}. ${item.machineName}
   Marca/Modelo: ${item.machineBrand} • ${item.machineModel}
   ${item.serialNumber ? `Número de Série: ${item.serialNumber}` : ""}
   ${item.manufacturingYear ? `Ano de Fabricação: ${item.manufacturingYear}` : ""}
   ${item.operatingHours ? `Horas de Uso: ${item.operatingHours}h` : ""}
   
   Urgência: ${urgencyLabels[item.urgency]}
   
   Categorias de Peças:
   ${item.partCategories.map((category) => `   • ${category}`).join("\n")}
   
   Descrição do Problema:
   "${item.problemDescription}"
   
   ${item.attachments.length > 0 ? `Anexos: ${item.attachments.map((file) => file.name).join(", ")}` : ""}
   
   Adicionado: ${item.addedAt.toLocaleString("pt-BR")}
`,
  )
  .join("\n---\n")}

PRÓXIMOS PASSOS
--------------
1. Nossa equipe técnica analisará cada solicitação detalhadamente
2. Verificaremos a disponibilidade das peças em nosso estoque  
3. Prepararemos um orçamento completo com preços e prazos
4. Entraremos em contato ${criticalItems.length > 0 ? "em até 4 horas" : "em até 24 horas"}

--
IndustrialParts - Especialistas em Peças Industriais
contato@industrialparts.com | (11) 1234-5678
  `.trim()
}
