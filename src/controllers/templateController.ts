import { get } from "lodash";

const PROJECT_TITLE = "Luftmobilität";

const partnersTemplate =
`
Name | Anschrift | Kontakt
-----|-----------|--------
`

const fillFrontendVariables = (template: string, data: any) => {
    // Regex to match all variables in template, that should be replace by values from frontend data
    const matchFrontentTemplateVars = /\{\{[\w\.\[\]]+\}\}/g;
    return template.replace(matchFrontentTemplateVars, (m, p) => { return getValue(m, data); });
}

var getValue = (path: any, obj: any, ) => {
    // Strip leading '{{' and last '}}'
    path = path.substr(2, path.length - 4);
    // Get value of obj at path
    return get(obj, path) || "";
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

const fillTitle = (template: string, title: string) => {
    return template.replace("{PROJECT_NAME}", title);
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
    template = fillTitle(template, PROJECT_TITLE);
    template = fillMarkdownContent(template, data.content);
    return template;
}

export const fillXMLTemplate = async (template: string, data: any) => {
    const commName = data.communicationPartner.name;
    const nameSplit = commName.lastIndexOf(" ");
    data.communicationPartner.firstName = commName.substring(0, nameSplit);
    data.communicationPartner.lastName = commName.substring(nameSplit + 1);

    template = fillFrontendVariables(template, data);
    return template;
}
