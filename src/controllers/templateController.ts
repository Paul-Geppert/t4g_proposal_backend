const partnersTemplate =
`
Name | Anschrift | Kontakt
-----|-----------|--------
`

const fillFrontendVariables = (template: string, data: any) => {
    // Regex to match all variables in template, that should be replace by values from frontend data
    const matchFrontentTemplateVars = /\{\{[\w\.]+\}\}/g;
    return template.replace(matchFrontentTemplateVars, (m, p) => { return getValue(m, data); });
}

var getValue = (path: any, obj: any, ) => {
    // Strip leading '{{' and last '}}'
    path = path.substr(2, path.length - 4);
    // Get value of obj at path
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
        obj = obj[path[i]];
    };
    return obj || "";
};

const fillPartners = (template: string, partners: Array<any>) => {
    let filledPartners = ""
    if (partners.length > 0) {
        filledPartners = partnersTemplate;
    }
    for (const p of partners) {
        const partnerString = `${p.name} | ${p.street} ${p.houseNumber}<br>${p.zipCode} ${p.city}<br>${p.country} | Telefon: ${p.phoneNumber}<br>Fax: ${p.faxNumber}<br>E-Mail: ${p.mailAddress}<br>Internet: ${p.webAddress}`;
        filledPartners = filledPartners.concat(partnerString);
    }
    return template.replace("{PROPOSAL_PARTNERS}", filledPartners);
}

const fillMarkdownContent = (template: string, content: Array<Array<any>>) => {
    let markdownContent = "";
    for (const contentInStep of content) {
        if (contentInStep.length > 0) {
            for (const question of contentInStep) {
                markdownContent = markdownContent.concat(`# ${question.title}\n`);
                let sanitizedAnswer = question.answer;
                sanitizedAnswer = sanitizedAnswer.replace(/^#\ /mg,"## ")
                markdownContent = markdownContent.concat(sanitizedAnswer);
                markdownContent = markdownContent.concat('\n');
            }
        }
    }
    return template.replace("{PROPOSAL_CONTENT}", markdownContent);
}

export const fillTemplate = async (template: string, data: any) => {
    template = fillFrontendVariables(template, data);
    template = fillPartners(template, data.partners);
    template = fillMarkdownContent(template, data.content);
    return template;
}
