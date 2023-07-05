export function createPDF(scan) {


    const pdf = {
        footer: function (currentPage, pageCount) {
            return {
                table:{
                    body:[
                        [
                            {
                                text: currentPage+' sur '+pageCount,
                                fontSize: 12,
                                alignment: 'right',
                                margin: [40,5,0,0],
                                color: "#0DB7ED"
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            }
        },
        content: [],
        style: {}
    }


    pdf.content.push(
        {
            columns: [
                {
                    svg: '<svg width="170" height="178" viewBox="0 0 170 178" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M69 156.931C68.5 158.931 65.9 163.131 59.5 163.931C52.8333 161.598 38.2 156.731 33 155.931C30 154.598 23 150.631 19 145.431C15 140.231 6 138.265 2 137.931C5 135.431 12.3 130.331 17.5 129.931C10.6667 111.931 2.8 71.4313 26 53.4313C32.3333 49.4313 47.9 46.9313 59.5 68.9313C71.1 90.9313 76 99.7647 77 101.431C79.3333 104.765 85.8 109.431 93 101.431C91.8333 107.431 86.3 117.931 73.5 111.931C70.8333 109.765 64.3 102.631 59.5 91.4313C53.5 77.4313 47 64.4313 37 64.9313C31.5 66.7647 22 77.5313 28 105.931C34 134.331 57.8333 151.765 69 156.931ZM34.5 144.931L32 147.431C35.2 149.831 39.6667 150.431 41.5 150.431L34.5 144.931Z" fill="#0DB7ED"/><path fill-rule="evenodd" clip-rule="evenodd" d="M150.676 85.1671C152.653 84.5841 157.592 84.6957 161.526 89.8066C162.895 96.7359 166.119 111.816 168.066 116.704C168.437 119.966 168.567 128.011 166.113 134.095C163.659 140.179 166.527 148.934 168.268 152.551C164.592 151.232 156.495 147.526 153.513 143.246C141.463 158.262 110.542 185.576 83.265 174.705C76.6062 171.274 66.5591 159.124 79.6408 137.971C92.7225 116.819 97.8521 108.117 98.7817 106.41C100.472 102.709 101.216 94.7687 90.6697 92.6186C96.4329 90.5822 108.289 90.0282 109.607 104.103C109.091 107.5 106.255 116.748 99.0346 126.564C90.0093 138.833 82.0995 151.027 87.6004 159.393C91.9691 163.204 106.066 165.934 127.503 146.364C148.941 126.793 151.884 97.4116 150.676 85.1671ZM157.824 120.988L161.246 121.876C161.692 117.901 159.945 113.746 159.016 112.166L157.824 120.988Z" fill="#0DB7ED"/><path fill-rule="evenodd" clip-rule="evenodd" d="M48.8785 50.8565C47.379 49.4418 44.9883 45.1192 47.4222 39.1463C52.7192 34.4739 64.1237 24.0934 67.3658 19.9499C69.9966 17.986 76.8811 13.8221 83.3734 12.8781C89.8656 11.9341 95.9845 5.04744 98.2325 1.72211C98.9448 5.56171 99.8206 14.4236 97.625 19.1543C116.667 22.0025 155.836 34.959 160.182 63.9995C160.572 71.4802 155.135 86.2793 130.273 85.6309C105.41 84.9825 95.3089 84.9336 93.3661 84.9902C89.3173 85.394 82.0833 88.7502 85.5371 98.9439C80.8753 94.9906 74.4257 85.0271 85.9215 76.8C89.1159 75.5346 98.5338 73.3272 110.65 74.6214C125.796 76.2391 140.313 76.9314 144.771 67.9657C145.863 62.272 141.122 48.7187 113.418 40.0549C85.7141 31.3911 58.8484 43.6461 48.8785 50.8565ZM76.2251 26.6405L75.2681 23.2369C71.6092 24.8533 68.9004 28.4552 68.0033 30.054L76.2251 26.6405Z" fill="#0DB7ED"/><path fill-rule="evenodd" clip-rule="evenodd" d="M69 156.931C68.5 158.931 65.9 163.131 59.5 163.931C52.8333 161.598 38.2 156.731 33 155.931C30 154.598 23 150.631 19 145.431C15 140.231 6 138.265 2 137.931C5 135.431 12.3 130.331 17.5 129.931C10.6667 111.931 2.8 71.4313 26 53.4313C32.3333 49.4313 47.9 46.9313 59.5 68.9313C71.1 90.9313 76 99.7647 77 101.431C79.3333 104.765 85.8 109.431 93 101.431C91.8333 107.431 86.3 117.931 73.5 111.931C70.8333 109.765 64.3 102.631 59.5 91.4313C53.5 77.4313 47 64.4313 37 64.9313C31.5 66.7647 22 77.5313 28 105.931C34 134.331 57.8333 151.765 69 156.931ZM34.5 144.931L32 147.431C35.2 149.831 39.6667 150.431 41.5 150.431L34.5 144.931Z" stroke="#0DB7ED"/><path fill-rule="evenodd" clip-rule="evenodd" d="M150.676 85.1671C152.653 84.5841 157.592 84.6957 161.526 89.8066C162.895 96.7359 166.119 111.816 168.066 116.704C168.437 119.966 168.567 128.011 166.113 134.095C163.659 140.179 166.527 148.934 168.268 152.551C164.592 151.232 156.495 147.526 153.513 143.246C141.463 158.262 110.542 185.576 83.265 174.705C76.6062 171.274 66.5591 159.124 79.6408 137.971C92.7225 116.819 97.8521 108.117 98.7817 106.41C100.472 102.709 101.216 94.7687 90.6697 92.6186C96.4329 90.5822 108.289 90.0282 109.607 104.103C109.091 107.5 106.255 116.748 99.0346 126.564C90.0093 138.833 82.0995 151.027 87.6004 159.393C91.9691 163.204 106.066 165.934 127.503 146.364C148.941 126.793 151.884 97.4116 150.676 85.1671ZM157.824 120.988L161.246 121.876C161.692 117.901 159.945 113.746 159.016 112.166L157.824 120.988Z" stroke="#0DB7ED"/><path fill-rule="evenodd" clip-rule="evenodd" d="M48.8785 50.8565C47.379 49.4418 44.9883 45.1192 47.4222 39.1463C52.7192 34.4739 64.1237 24.0934 67.3658 19.9499C69.9966 17.986 76.8811 13.8221 83.3734 12.8781C89.8656 11.9341 95.9845 5.04744 98.2325 1.72211C98.9448 5.56171 99.8206 14.4236 97.625 19.1543C116.667 22.0025 155.836 34.959 160.182 63.9995C160.572 71.4802 155.135 86.2793 130.273 85.6309C105.41 84.9825 95.3089 84.9336 93.3661 84.9902C89.3173 85.394 82.0833 88.7502 85.5371 98.9439C80.8753 94.9906 74.4257 85.0271 85.9215 76.8C89.1159 75.5346 98.5338 73.3272 110.65 74.6214C125.796 76.2391 140.313 76.9314 144.771 67.9657C145.863 62.272 141.122 48.7187 113.418 40.0549C85.7141 31.3911 58.8484 43.6461 48.8785 50.8565ZM76.2251 26.6405L75.2681 23.2369C71.6092 24.8533 68.9004 28.4552 68.0033 30.054L76.2251 26.6405Z" stroke="#0DB7ED"/></svg>',
                    width: 50,
                    height: 50,
                },
                {
                    width: '*',
                    stack: [
                        {text: 'ALPOS', fontSize: 18, bold: true, color: '#0DB7ED'},
                        {text: 'Le monstre de scan ', fontSize: 12}
                    ],
                    margin: [15, 5, 0, 0],
                }
            ],
            margin: [0, 20, 0, 0],
        }
    );


    pdf.content.push(
        {
            text: 'Scan Rapport',
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 50, 0, 0],
        }
    );


    pdf.content.push(
        {
            text: 'Aperçu de scan',
            fontSize: 15,
            bold: true,
            color: '#0DB7ED',
            margin: [0, 50, 0, 0],
        }
    );


    pdf.content.push(
        {
            table: {
                widths: [15, '*', '*', '*', 55, 80, '*'],
                body: [
                    [
                        {text: 'ID', color: 'white'},
                        {text: 'Nom', color: 'white'},
                        {text: 'Créé à', color: 'white'},
                        {text: 'Lancé à', color: 'white'},
                        {text: 'Machines', color: 'white'},
                        {text: 'Vulnerabilities', color: 'white'},
                        {text: 'Lancé par', color: 'white'},
                    ],
                    [
                        {text: scan.id, italics: true, color: 'gray'},
                        {text: scan.name, italics: true, color: 'gray'},
                        {text: scan.createdDate, italics: true, color: 'gray'},
                        {text: scan.date, italics: true, color: 'gray'},
                        {text: scan.numberOfMachines, italics: true, color: 'gray'},
                        {text: scan.numberOfVulnerabilities, italics: true, color: 'gray'},
                        {text: scan.launcherFirstName + ' ' + scan.launcherLastName, italics: true, color: 'gray'}
                    ]
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? '#0DB7ED' : null;
                }
            },
            margin: [0, 10, 0, 0],
        }
    );

    pdf.content.push(
        {
            text: 'Machines',
            fontSize: 15,
            bold: true,
            color: '#0DB7ED',
            margin: [0, 50, 0, 0],
        }
    );


    scan.machines.forEach(machine => {
        pdf.content.push(
            {
                stack: [
                    {text: machine.ip, fontSize: 18, bold: true},
                    {text: 'Vunerabilities: ' + machine.numberOfVunerabilities, fontSize: 12, color: 'gray'}
                ],
                margin: [0, 15, 0, 0],
            }
        );

        const tableBody = [
            [
                {text: 'Code', color: 'white'},
                {text: 'Cvss', color: 'white'},
                {text: 'Gravité', color: 'white'},
                {text: 'Publication', color: 'white'},
                {text: 'Description', color: 'white'},
            ]
        ];

        machine.cves.forEach(cve => {
            tableBody.push(
                [
                    {text: cve.code, italics: true, color: 'gray'},
                    {text: cve.cvss, italics: true, color: 'gray'},
                    {text: cve.severity, italics: true, color: 'gray'},
                    {text: cve.publishedDate, italics: true, color: 'gray'},
                    {text: cve.description, italics: true, color: 'gray', alignment: 'justify'},
                ]
            );
        });

        if (machine.cves.length !== 0) {
            pdf.content.push(
                {
                    headerRows: 1,
                    table: {
                        widths: [90, 30, 55, 80, '*'],
                        body: tableBody
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex === 0) ? '#0DB7ED' : null;
                        }
                    },
                    margin: [0, 10, 0, 0],
                }
            );
        }

    });

    return pdf;
}