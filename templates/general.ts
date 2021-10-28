export default `# Skizzeneinreichung {PROJECT_NAME}

[![Alt text](https://tech.4germany.org/wp-content/uploads/2020/01/Logo-Final-02-copy-1-300x109-1.png)](https://tech.4germany.org)

| | |
----|---
Name | {{creator.name}}
Addresse | {{creator.street}} {{creator.houseNumber}}<br>{{creator.zipCode}} {{creator.city}}<br>{{creator.country}} |
Telefon | {{creator.phoneNumber}}
Fax | {{creator.faxNumber}}
E-Mail | {{creator.mailAddress}}
Internet | {{creator.webAddress}}

## Weitere Projektpartner

{PROPOSAL_PARTNERS}

## Ausführende Stelle

{{executor}}

## Projektkoordination/-Leitung

| | |
----|---
Name | {{leader.name}}
Addresse | {{leader.street}} {{leader.houseNumber}}<br>{{leader.zipCode}} {{leader.city}}<br>{{leader.country}} |
Telefon | {{leader.phoneNumber}}
Fax | {{leader.faxNumber}}
E-Mail | {{leader.mailAddress}}
Internet | {{leader.webAddress}}

## Ansprechpartner Projektleitung

| | |
----|---
Name | {{communicationPartner.name}}
Addresse | {{communicationPartner.street}} {{communicationPartner.houseNumber}}<br>{{communicationPartner.zipCode}} {{communicationPartner.city}}<br>{{communicationPartner.country}} |
Telefon | {{communicationPartner.phoneNumber}}
Fax | {{communicationPartner.faxNumber}}
E-Mail | {{communicationPartner.mailAddress}}
Internet | {{communicationPartner.webAddress}}

{PROPOSAL_CONTENT}`;
