const PdfPrinter = require('pdfmake');
const fs = require('fs');

// Cargar fuentes requeridas por pdfmake
const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

const printer = new PdfPrinter(fonts);

function generarPDF(data) {
  const PdfPrinter = require('pdfmake');
  const fs = require('fs');
  const path = require('path');

  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  const printer = new PdfPrinter(fonts);

  const logo = 'logo.png';
  const qr = 'qr.png';

  const tipoPersonaTexto =
  (data.tipo_persona === 'fisica' ? '[x]' : '[ ]') + ' PERSONA FÍSICA     ' + 
  (data.tipo_persona === 'moral' ? '[x]' : '[ ]') + ' PERSONA MORAL';
  
  const tipoTelefonoTexto =
  (data.tipo_telefono === 'fijo' ? '[x]' : '[ ]') + ' FIJO   ' +
  (data.tipo_telefono === 'movil' ? '[x]' : '[ ]') + ' MÓVIL';

  const tarifaReconexionTexto =
  (data.tarifa_reconexion === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
  (data.tarifa_reconexion === 'no' ? '[x]' : '[ ]') + ' No';

  const metodoPago = data.metodo_pago?.toLowerCase(); // Normaliza por si viene con mayúsculas
  const metodoPagoTexto =
    (metodoPago === 'efectivo' ? '[x]' : '[ ]') + ' Efectivo\n' +
    (metodoPago === 'tarjeta' ? '[x]' : '[ ]') + ' Domiciliado con Tarjeta\n' +
    (metodoPago === 'transferencia' ? '[x]' : '[ ]') + ' Transferencia Bancaria\n' +
    (metodoPago === 'deposito' ? '[x]' : '[ ]') + ' Depósito a cuenta Bancaria';
  
  const respuestaFactura = (data.autorizacion_factura || '').toLowerCase();
  const autorizacionFacturaTexto =
    (respuestaFactura === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
    (respuestaFactura === 'no' ? '[x]' : '[ ]') + ' No';
    
  const respuestaCarta = (data.autorizacion_carta || '').toLowerCase();
  const autorizacionCartaTexto =
    (respuestaCarta === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
    (respuestaCarta === 'no' ? '[x]' : '[ ]') + ' No';
      
  const respuestaContrato = (data.autorizacion_contrato || '').toLowerCase();
  const autorizacionContratoTexto =
    (respuestaContrato === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
    (respuestaContrato === 'no' ? '[x]' : '[ ]') + ' No';
   
  const respuestaTerceros = (data.autorizacion_informacion_terceros || '').toLowerCase();
  const autorizacionTercerosTexto =
    (respuestaTerceros === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
    (respuestaTerceros === 'no' ? '[x]' : '[ ]') + ' No';

  const respuestaLlamadas = (data.acepta_llamadas_promociones || '').toLowerCase();
  const aceptaLlamadasTexto =
      (respuestaLlamadas === 'si' ? '[x]' : '[ ]') + ' Sí   ' +
      (respuestaLlamadas === 'no' ? '[x]' : '[ ]') + ' No';
    
    
const docDefinition = {
  content: [
    {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo, // Ruta local o base64
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4',bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA',bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN',bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA',bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66',bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
    { text: '\n' },

    {
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              {
                text: 'SUSCRIPTOR',
                colSpan: 2,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              },
              {}
            ],
            [
              { text: 'TIPO DE PERSONA', bold: true, fontSize: 9 },
              { text: tipoPersonaTexto, fontSize: 9 }
            ]
            ,
            [
              { text: 'NOMBRE/RAZÓN SOCIAL O DENOMINACIÓN', bold: true, fontSize: 9 },
              { text: `${data.nombre}`, fontSize: 9 }
            ],
            [
              { text: 'REPRESENTANTE LEGAL', bold: true, fontSize: 9 },
              { text: `${data.representante}`, fontSize: 9 }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      }
      ,
      {
        table: {
          widths: ['14%', '10%', '10%', '18%', '18%', '15%', '15%'],
          body: [
            [
              {
                text: 'DOMICILIO',
                colSpan: 7,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}, {}, {}, {}
            ],
            [
              { text: 'Calle', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: '#Ext', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: '#Int', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: 'Colonia', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: 'Alcaldía/Municipio', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: 'Estado', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: 'C.P:', fillColor: '#eeeeee', bold: true, fontSize: 9 }
            ],
            [
              { text: `${data.calle}`, fontSize: 9 },
              { text: `${data.numero_exterior}`, fontSize: 9 },
              { text: `${data.numero_interior}`, fontSize: 9 },
              { text: `${data.colonia}`, fontSize: 9 },
              { text: `${data.alcaldia_municipio || 'N/A'}`, fontSize: 9 },
              { text: `${data.estado}`, fontSize: 9 },
              { text: `${data.codigo_postal}`, fontSize: 9 }
            ],
            [
                {
                  text: tipoTelefonoTexto,
                  fillColor: '#eeeeee',
                  bold: true,
                  fontSize: 9,
                  colSpan: 2
                }, {}, // <- debe haber un objeto vacío por cada columna combinada
                {
                  text: `${data.telefono}`,
                  fontSize: 9,
                  colSpan: 2
                }, {},
                {
                  text: 'RFC',
                  fillColor: '#eeeeee',
                  bold: true,
                  fontSize: 9
                },
                {
                  text: `${data.rfc}`,
                  fontSize: 9,
                  colSpan: 2
                }, {}
              ]              
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['30%', '15%', '15%', '20%', '20%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'SERVICIOS DE INTERNET FIJO',
                colSpan: 5,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}, {}
            ],
            // Fila 2 – Encabezados
            [
              { text: 'DESCRIPCIÓN PAQUETE/OFERTA (INCISO l) NOM numeral 5.1.2.1)', fillColor: '#eeeeee', bold: true, fontSize: 8 },
              { text: 'FOLIO IFT:', fillColor: '#eeeeee', bold: true, fontSize: 8 },
              { text: 'TARIFA', fillColor: '#eeeeee', bold: true, fontSize: 8 },
              { text: 'FECHA DE PAGO Modalidad POS PAGO', fillColor: '#eeeeee', bold: true, fontSize: 8 },
              { text: `${data.fecha_pago_servicio}`, fillColor: '#eeeeee' }
            ],
            // Fila 3
            [
              {
                text: `${data.descripcion_paquete}`,
                rowSpan: 4,
                fontSize: 8
              },
              { text: `${data.folio_ift}`, fontSize: 8 },
              { text: 'duda de que va ahi', fontSize: 8 },
              {
                text: 'VIGENCIA Y PENALIDAD',
                rowSpan: 4,
                alignment: 'center',
                fontSize: 8
              }
              ,
              {
                text: '☐ INDEFINIDO\n*SIN PENALIDAD\n\n☐ PLAZO FORZOSO DE _____ MESES\nPENALIDAD DE LIQUIDACIÓN DEL 20% DE LOS MESES RESTANTES AL PLAZO FORZOSO.',
                rowSpan: 4,
                fontSize: 7
              }
            ],
            // Fila 4
            [
              {},
              { text: 'Total Mensualidad', fillColor: '#eeeeee', fontSize: 8 },
              {
                text: '$ M.N',
                rowSpan: 2,
                alignment: 'center',
                fontSize: 8
              },
              {}, {}
            ],
            // Fila 5
            [
              {},
              { text: `$ ${data.total_mensualidad}`, fontSize: 8 },
              {}, {}, {}
            ],
            // Fila 6
            [
              {},
              {
               text: `Aplica tarifa por Reconexión: ${tarifaReconexionTexto}`, fontSize: 9 ,
                fontSize: 8
              },
              {}, {}, {}
            ],
            // Fila 7 – Texto informativo final
            [
              {
                text: 'En el Estado de cuenta y/o factura se podrá visualizar la fecha de corte del servicio y fecha de pago.',
                colSpan: 5,
                fontSize: 8,
                alignment: 'justify',
                margin: [2, 2, 2, 2]
              }, {}, {}, {}, {}
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        columns: [
          {
            table: {
              widths: ['50%', '50%'],
              body: [
                [
                  {
                    text: 'DATOS DEL EQUIPO Modem entregado en:',
                    colSpan: 2,
                    fillColor: '#eeeeee',
                    bold: true,
                    fontSize: 9,
                    margin: [5, 5, 5, 5]
                  }, {}
                ],
                [
                  {
                    text: '☐ Sí   ☐ No   (Comodato)',
                    colSpan: 2,
                    fontSize: 9,
                    margin: [5, 5, 5, 5]
                  }, {}
                ],
                [
                  { text: 'Marca:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.marca}`, fontSize: 9 }
                ],
                [
                  { text: 'Modelo:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.modelo}`, fontSize: 9 }
                ],
                [
                  { text: 'Número de Serie:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.numero_serie}`, fontSize: 9 }
                ],
                [
                  { text: 'Número de Equipos:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.numero_equipos}`, fontSize: 9 }
                ],
                [
                  {
                    text: 'Garantía de cumplimiento de obligación:',
                    fillColor: '#eeeeee',
                    colSpan: 2,
                    bold: true,
                    fontSize: 9,
                    margin: [10, 10, 10, 21]
                  }, {}
                ]
              ]
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5
            },
            width: '50%',
            margin: [0, 0, 0, 0]
          },
          {
            table: {
              widths: ['25%', '25%', '25%', '25%'],
              body: [
                [
                  {
                    text: 'INSTALACIÓN DEL EQUIPO \n (antena, router, mástil y cableado)',
                    colSpan: 4,
                    fillColor: '#eeeeee',
                    bold: true,
                    fontSize: 9,
                    alignment: 'center',
                    margin: [5, 5, 5, 5]
                  }, {}, {}, {}
                ],
                [
                  { text: 'Domicilio Instalación',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.direccion_instalacion}`,fontSize: 9, colSpan: 3 }, {}, {}
                ],
                [
                  { text: 'Fecha:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.fecha_instalacion}`,fontSize: 9 },
                  { text: 'Hora:',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `${data.hora_instalacion}`,fontSize: 9 }
                ],
                [
                  { text: 'Costo',fillColor: '#eeeeee', bold: true, fontSize: 9 },
                  { text: `$ ${data.costo_instalacion}`,fontSize: 9, colSpan: 3 }, {}, {}
                ],
                [
                  {
                    text: 'EL PROVEEDOR deberá efectuar las instalaciones y empezar a prestar el servicio en un plazo que no exceda de 10 días hábiles a partir de la firma del contrato.',
                    colSpan: 4,
                    fontSize: 8,
                    alignment: 'justify',
                    margin: [0, 0, 0, 0]
                  }, {}, {}, {}
                ],
                [
                  {
                    text: 'Pagaré para garantizar la devolución del equipo entregado en comodato. Visible en el anexo de la presente carátula y contrato de adhesión.',
                    colSpan: 4,
                    fontSize: 8,
                    alignment: 'justify',
                    margin: [0, 0, 0, 0]
                  }, {}, {}, {}
                ]
              ]
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5
            },
            width: '50%',
            margin: [0, 0, 0, 0]
          },
          
        ]
      },
      {
        table: {
          widths: ['40%', '60%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'MÉTODO DE PAGO',
                colSpan: 2,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [5, 5, 5, 5]
              }, {}
            ],
            // Fila 2
            [
              {
                text: metodoPagoTexto,
                rowSpan: 2,
                fontSize: 9,
                margin: [5, 5, 5, 5]
              }
              ,
              {
                text: 'Datos para el método de pago elegido.',
                fillColor: '#eeeeee',
                fontSize: 9
              }
            ],
            // Fila 3 – Segunda parte de la columna derecha
            [
              {}, // ← celda izquierda ya está combinada (rowSpan: 2), se deja vacía aquí
              {
                text: `${data.datos_metodo_pago}`,
                fontSize: 9
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },      
      {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'AUTORIZACIÓN PARA CARGO DE TARJETA DE CRÉDITO O DÉBITO',
                colSpan: 4,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}
            ],
            // Fila 2 – Texto de autorización y checkbox
            [
              {
                text: 'Por medio de la presente autorizo a "EL PROVEEDOR", para que cargue a mi tarjeta de crédito o débito, la cantidad por concepto de servicios que mensualmente me presta. La vigencia de los cargos será por __________ meses.  ☐ Sí   ☐ No',
                colSpan: 4,
                fontSize: 9,
                alignment: 'justify',
                margin: [0, 0, 0, 0]
              }, {}, {}, {}
            ],
            // Fila 3 – Banco y Tarjeta
            [
              {
                text: 'Banco',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              { text: '(banco)', fontSize: 9 },
              {
                text: 'Número de Tarjeta:',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              { text: '(número de tarjeta)', fontSize: 9 }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        text: '',
        pageBreak: 'before'
      },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        table: {
          widths: ['15%', '20%', '15%', '15%', '20%', '15%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'SERVICIOS ADICIONALES',
                colSpan: 6,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}, {}, {}
            ],
            // Fila 2 – Números 1 y 2 + espacios vacíos
            [
              {
                text: '1',
                fillColor: '#eeeeee',
                alignment: 'center',
                bold: true,
                fontSize: 9
              },
              {
                text: data.nombre_servicio_1 || '—',
                colSpan: 2,
                fontSize: 8
              }, {},
              {
                text: '2',
                fillColor: '#eeeeee',
                alignment: 'center',
                bold: true,
                fontSize: 9
              },
              {
                text: data.nombre_servicio_2 || '—',
                colSpan: 2,
                fontSize: 8
              }, {}
            ],
            // Fila 3 – Encabezados de descripción y costo
            [
              { text: 'DESCRIPCIÓN', bold: true, fontSize: 9 },
              { text: 'COSTO', bold: true, fontSize: 9 },
              { text: data.costo_servicio_1 || '—', fontSize: 8 },
              { text: 'DESCRIPCIÓN', bold: true, fontSize: 9 },
              { text: 'COSTO', bold: true, fontSize: 9 },
              { text: data.costo_servicio_2 || '—', fontSize: 8 }
            ],
            // Fila 4 – Celdas combinadas para respuestas
            [
              {
                text: data.descripcion_servicio_1 || '—',
                colSpan: 3,
                fontSize: 8
              }, {}, {},
              {
                text: data.descripcion_servicio_2 || '—',
                colSpan: 3,
                fontSize: 8
              }, {}, {}
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['15%', '20%', '15%', '15%', '20%', '15%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'CONCEPTOS FACTURABLES \n (Ejemplo: Costo por cambio de domicilio, Costos administrativos adicionales)',
                colSpan: 6,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}, {}, {}
            ],
            // Fila 2 – Números 1 y 2 + espacios vacíos
            [
              {
                text: '1',
                fillColor: '#eeeeee',
                alignment: 'center',
                bold: true,
                fontSize: 9
              },
              {
                text: data.nombre_concepto_1 || '—',
                colSpan: 2,
                fontSize: 8
              }, {},
              {
                text: '2',
                fillColor: '#eeeeee',
                alignment: 'center',
                bold: true,
                fontSize: 9
              },
              {
                text: data.nombre_concepto_2 || '—',
                colSpan: 2,
                fontSize: 8
              }, {}
            ],
            // Fila 3 – Encabezados de descripción y costo
            [
              { text: 'DESCRIPCIÓN', bold: true, fontSize: 9 },
              { text: 'COSTO', bold: true, fontSize: 9 },
              { text: data.costo_concepto_1 || '—', fontSize: 8},
              { text: 'DESCRIPCIÓN', bold: true, fontSize: 9 },
              { text: 'COSTO', bold: true, fontSize: 9 },
              { text: data.costo_concepto_2 || '—', fontSize: 8 }
            ],
            // Fila 4 – Celdas combinadas para respuestas
            [
              {
                text: data.descripcion_concepto_1 || '—',
                colSpan: 3,
                fontSize: 8
              }, {}, {},
              {
                text: data.descripcion_concepto_2 || '—',
                colSpan: 3,
                fontSize: 8
              }, {}, {}
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['15%', '15%', '20%', '15%', '20%', '15%'],
          body: [
            // Fila 1 – Título combinado
            [
              {
                text: 'EL SUSCRIPTOR AUTORIZA SE LE ENVÍE POR CORREO ELECTRÓNICO',
                colSpan: 6,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9,
                margin: [0, 0, 0, 0]
              }, {}, {}, {}, {}, {}
            ],
            // Fila 2 – Checkbox por cada documento
            [
              { text: 'Factura', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: autorizacionFacturaTexto, fontSize: 9 },
              { text: 'Carta de Derechos Mínimos', bold: true, fontSize: 9 },
              { text: autorizacionCartaTexto, fontSize: 9 },
              { text: 'Contrato de Adhesión', fillColor: '#eeeeee', bold: true, fontSize: 9 },
              { text: autorizacionContratoTexto, fontSize: 9 }
            ],
            // Fila 3 – Correo autorizado y firma con combinaciones
            [
              { text: 'CORREO ELECTRÓNICO AUTORIZADO:', bold: true, fontSize: 9 },
              { text: `${data.correo_autorizado}`,fontSize: 9, colSpan: 2 }, {}, // columna 2 y 3 combinadas
              { text: 'FIRMA SUSCRIPTOR', bold: true, fontSize: 9 },
              { text: '', colSpan: 2 }, {} // columna 5 y 6 combinadas
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['100%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'AUTORIZACIÓN PARA USO DE INFORMACIÓN DEL SUSCRIPTOR',
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 10,
                margin: [0, 0, 0, 0]
              }
            ],
            // Fila 2 – Texto 1 con checkbox
            [
              {
                text: [
                  '1. El Suscriptor ',autorizacionTercerosTexto,' autoriza que su información sea cedida o transmitida por el proveedor a terceros con fines mercadotécnicos o publicitarios. FIRMA ___________________'
                ],
                alignment: 'justify',
                fontSize: 9,
                margin: [0, 0, 0, 0]
              }
              
            ],
            // Fila 3 – Texto 2 con checkbox
            [
              {
                text: [
                  '2. El Suscriptor ',aceptaLlamadasTexto,' acepta recibir llamadas del proveedor de promociones de servicios o paquetes. FIRMA ___________________'
                ],
                alignment: 'justify',
                fontSize: 9,
                margin: [0, 0, 0, 0]
              }
              
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['25%', '45%', '30%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'MEDIOS DE CONTACTO DEL PROVEEDOR PARA QUEJAS, ACLARACIONES, CONSULTAS Y CANCELACIONES',
                colSpan: 3,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9,
                margin: [0, 0, 0, 0]
              }, {}, {}
            ],
            // Fila 2 – Teléfono
            [
              {
                text: 'TELÉFONO',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              {
                text: '238-374-21-28, 238-688-57-66, 238-408-31-12 y 238-168-64-73',
                fontSize: 9
              },
              {
                text: 'Disponible las 24 horas del día los 7 días de la semana',
                fontSize: 9
              }
            ],
            // Fila 3 – Correo electrónico
            [
              {
                text: 'CORREO ELECTRÓNICO:',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              {
                text: 'atencionaclientesinterfem@gmail.com',
                fontSize: 9,
                color: 'blue',
                decoration: 'underline'
              },
              {
                text: 'Disponible las 24 horas del día los 7 días de la semana',
                fontSize: 9
              }
            ],
            // Fila 4 – Centros de atención
            [
              {
                text: 'CENTROS DE ATENCIÓN A CLIENTES:',
                bold: true,
                fontSize: 9
              },
              {
                text: 'Consultar horarios disponibles, días disponibles y centros de atención a clientes disponibles en la página de internet https://inter-fem.com/',
                colSpan: 2,
                fontSize: 9,
                alignment: 'justify'
              },
              {}
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['40%', '60%'],
          body: [
            // Fila 1 – Título
            [
              {
                text: 'LA PRESENTE CARÁTULA Y EL CONTRATO DE ADHESIÓN SE ENCUENTRAN DISPONIBLES EN:',
                colSpan: 2,
                alignment: 'center',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9,
                margin: [0, 0, 0, 0]
              }, {}
            ],
            // Fila 2 – Página del proveedor
            [
              {
                text: 'La página del proveedor',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              {
                text: 'https://inter-fem.com/',
                fontSize: 9,
                color: 'blue',
                decoration: 'underline'
              }
            ],
            // Fila 3 – Buró comercial
            [
              {
                text: 'Buró comercial de PROFECO',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              {
                text: 'https://burocomercial.profeco.gob.mx/',
                fontSize: 9,
                color: 'blue',
                decoration: 'underline'
              }
            ],
            // Fila 4 – Físicamente
            [
              {
                text: 'Físicamente en los centros de atención del proveedor',
                fillColor: '#eeeeee',
                bold: true,
                fontSize: 9
              },
              {
                text: 'Consultar centros de atención a clientes en https://inter-fem.com/',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        table: {
          widths: ['100%'],
          body: [
            [
              {
                stack: [
                  {
                    text: 'LA PRESENTE CARÁTULA SE RIGE CONFORME A LAS CLÁUSULAS DEL CONTRATO DE ADHESIÓN REGISTRADO EN PROFECO EL 25/09/2023, CON NÚMERO: 484-2023 DISPONIBLE EN EL SIGUIENTE CÓDIGO:',
                    alignment: 'justify',
                    fontSize: 9,
                    margin: [0, 0, 0, 0]
                  },
                  {
                    image: 'qr.png',
                    width: 100,
                    alignment: 'center',
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: 'LAS FIRMAS INSERTAS ABAJO SON LA ACEPTACIÓN DE LA PRESENTE CARÁTULA Y CLAUSULADO DEL CONTRATO CON NÚMERO __________',
                    alignment: 'justify',
                    fontSize: 9,
                    margin: [0, 0, 0, 0]
                  }
                ]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        },
        margin: [0, 0, 0, 0]
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                image: data.firma_proveedor,
                width: 150,
                height: 40,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                text: 'FIRMA DEL PROVEEDOR',
                alignment: 'center',
                fontSize: 9,
                margin: [0, 5, 0, 0]
              }
            ]
          }
          ,
          {
            width: '50%',
            stack: [
              {
                image: data.firma,
                width: 150,
                height: 40,
                alignment: 'center',
                margin: [0, 10, 0, 0]
              },
              {
                text: 'FIRMA DEL SUSCRIPTOR',
                alignment: 'center',
                fontSize: 9,
                margin: [0, 5, 0, 0]
              }
            ]
          }
          
        ],
        margin: [0, 30, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: 'CONTRATO DE PRESTACIÓN DE SERVICIO DE INTERNET FIJO QUE CELEBRA POR UNA PARTE TECNOLOGÍAS FEM S.A.S. DE C.V. Y POR OTRA PARTE EL SUSCRIPTOR, AL TENOR DE LO SIGUIENTE.\n\nDECLARACIONES',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        margin: [0, 10, 0, 10]
      },
      {
        text: '1. Ambas partes declaran:',
        bold: true,
        fontSize: 9,
        alignment: 'justify',
        margin: [0, 0, 0, 5]
      },
      {
        ol: [
          {
            text: 'Que los datos consistentes en el domicilio, RFC y datos de localización del domicilio son ciertos y se encuentran establecidos en la carátula del presente contrato.',
            fontSize: 9,
            alignment: 'justify',
            margin: [5, 2, 0, 2]
          },
          {
            text: 'Que tienen pleno goce de sus derechos y capacidad legal para contratar y obligarse en términos del presente contrato.',
            fontSize: 9,
            alignment: 'justify',
            margin: [5, 2, 0, 2]
          },
          {
            text: 'Que aceptan que el presente contrato se regirá por la Ley Federal de Protección al Consumidor, Ley Federal de Telecomunicaciones y Radiodifusión, la Norma Oficial Mexicana NOM-184-SCFI-2018, Elementos Normativos y Obligaciones Específicas que deben Observar los Proveedores para la Comercialización y/o Prestación de los Servicios de Telecomunicaciones cuando Utilicen una Red Pública de Telecomunicaciones, y demás normatividad aplicable, por lo que los derechos y obligaciones establecidas en dicho marco normativo se tendrán por aquí reproducidas como si a la letra se insertase.',
            fontSize: 9,
            alignment: 'justify',
            margin: [5, 2, 0, 2]
          },
          {
            text: 'Que la manifestación de la voluntad para adherirse al presente contrato de adhesión y su carátula (la cual forma parte integrante del referido contrato) son las firmas que plasmen las partes en la carátula.',
            fontSize: 9,
            alignment: 'justify',
            margin: [5, 2, 0, 2]
          },
          {
            text: 'Que es su voluntad celebrar el presente contrato sujetándose a las siguientes:',
            fontSize: 9,
            alignment: 'justify',
            margin: [5, 2, 0, 2]
          }
        ]
      },
      // Título centrado entre columnas
{
    text: 'CLÁUSULAS',
    bold: true,
    fontSize: 10,
    alignment: 'center',
    margin: [0, 10, 0, 10]
  },
  // Dos columnas de texto legal
  {
    columns: [
      {
        width: '49%',
        stack: [
          {
            text:
              'PRIMERA: OBJETO DEL CONTRATO. El PROVEEDOR se obliga a prestar el servicio de Internet fijo en casa, (en adelante el Servicio), de manera continua, uniforme, regular y eficiente, a cambio del pago de la tarifa, plan o paquete que el SUSCRIPTOR haya seleccionado en la carátula del presente contrato, los cuales no podrán ser menores a los índices y parámetros de calidad que establezca el Instituto Federal de Telecomunicaciones (en adelante IFT), ni menores a los ofrecidos implícitamente o contratados en el presente instrumento.\n\n' +
              'El presente contrato se regirá bajo el esquema de POSPAGO es decir se va a pagar el servicio de manera posterior a utilizarlo. Cualquier cargo por el SERVICIO comienza a partir de la fecha en la que efectivamente el PROVEEDOR inicie la prestación del SERVICIO.\n\n' +
              'El PROVEEDOR es el único responsable frente al SUSCRIPTOR por la prestación del SERVICIO, así como de los bienes o servicios adicionales contratados.\n\n' +
              'Todo lo pactado o contratado entre el SUSCRIPTOR y el PROVEEDOR de manera verbal o electrónica se le debe confirmar por escrito al SUSCRIPTOR a través de los medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita o del medio que él elija, en un plazo máximo de cinco días hábiles, contados a partir del momento en que se realice el pacto o contratación.',
            fontSize: 9,
            alignment: 'justify'
          }
        ]
      },
      {
        width: '49%',
        stack: [
          {
            text:
              'SEGUNDA: VIGENCIA. Este contrato NO obliga a un plazo forzoso, por lo que al tener una vigencia indeterminada el SUSCRIPTOR puede darlo por terminado en cualquier momento, SIN penalidad alguna y sin necesidad de recabar autorización del PROVEEDOR, únicamente se tendrá que dar aviso a este último a través del mismo medio en el cual contrató el servicio o por los medios de contacto señalados en la carátula.\n\n' +
              'Sin perjuicio de lo anterior, las partes pueden pactar en el presente Contrato que se establezca un Plazo Forzoso máximo de permanencia por la adquisición de alguna promoción vigente, misma que no excederá de 3 (tres) meses y en caso de que cualquiera de las partes solicite su terminación anticipada, se obliga a pagar a la otra parte el 20% del monto total de los meses pendientes por cubrir relativos al plazo forzoso.\n\n' +
              'EL PROVEEDOR debe comunicar de manera fehaciente al SUSCRIPTOR que el plazo forzoso está por concluir con al menos 30 (treinta) días de anticipación a que termine dicho plazo, a través de la factura correspondiente, vía mensaje de texto o a través de medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología.\n\n' +
              'Una vez cumplido el plazo forzoso, el presente contrato tendrá una vigencia indeterminada, por lo que el SUSCRIPTOR podrá dar por terminado en cualquier momento, sin penalización alguna, y sin necesidad de',
            fontSize: 9,
            alignment: 'justify'
          }
        ]
      }
    ],
    columnGap: 10,
    margin: [0, 0, 0, 10]
  },   
  { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  '...recabar autorización del PROVEEDOR, únicamente dando el aviso correspondiente.\n\n' +
                  'TERCERA: EQUIPO TERMINAL. Los equipos y accesorios que son necesarios para recibir el SERVICIO son propiedad del PROVEEDOR mismos que se entregan al SUSCRIPTOR en COMODATO (en préstamo), mismos que deberán estar homologados conforme a lo establecido en la LFTR y las disposiciones jurídicas aplicables.\n\n' +
                  'El SUSCRIPTOR se compromete a la guarda, custodia y conservación del (los) equipo(s), durante todo el tiempo que se encuentre en su poder, hasta la terminación del presente contrato y deberán ser devueltos al PROVEEDOR, presentando únicamente el desgaste natural por el paso del tiempo, y por su parte el PROVEEDOR se obliga a dar mantenimiento a los equipos y accesorios para la adecuada prestación del SERVICIO.\n\n' +
                  'En caso de que el Equipo proporcionado en comodato fallara durante la vigencia del presente contrato, el PROVEEDOR informará al SUSCRIPTOR, a través de medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita, el procedimiento que debe seguir para llevar a cabo la reparación y/o mantenimiento del equipo.\n\n' +
                  'Cuando las fallas que se presenten en el equipo y accesorios no sean atribuibles al SUSCRIPTOR, el PROVEEDOR se obliga a realizar de manera gratuita las reparaciones necesarias, en tanto este contrato permanezca vigente. Ambas partes deberán coordinarse para establecer la fecha y hora en que se llevarán a cabo dichas actividades. El personal designado por el PROVEEDOR se debe de identificar y mostrar al SUSCRIPTOR la orden de trabajo expedida por el PROVEEDOR..\n\n' + 
                  'En caso de que el equipo terminal se encuentre en reparación o mantenimiento, el PROVEEDOR debe suspender el cobro del SERVICIO por el periodo que dure la revisión, reparación y/o mantenimiento de dicho equipo terminal, excepto cuando el PROVEEDOR acredite que el SUSCRIPTOR está haciendo uso del servicio o le haya proporcionado un equipo sustituto.\n\n' +
                  'Cuando el Equipo provisto en comodato, sea robado o sea objeto de algún siniestro, el SUSCRIPTOR deberá dar aviso inmediato al PROVEEDOR, en un plazo que no excederá de veinticuatro horas posteriores al evento para suspender el cobro del SERVICIO hasta que el SUSCRIPTOR tenga otro equipo para poder recibir el SERVICIO. Después de suspender el Servicio de Telecomunicaciones por robo o extravío del Equipo Terminal de telecomunicaciones de conformidad con'
                  ,
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  ' las disposiciones administrativas aplicables, se debe abstener de realizar cobros relacionados con la prestación del Servicio de Telecomunicaciones durante los 10 (diez) días naturales siguientes al reporte y sólo puede cobrar los cargos asociados a saldos insolutos del servicio de telecomunicaciones y el Equipo Terminal de telecomunicaciones, excepto cuando el Proveedor de Servicios de Telecomunicaciones acredite que el Consumidor está haciendo uso del servicio de telecomunicaciones. \n\n' +
                  'El SUSCRIPTOR tendrá un plazo de 30 días hábiles posteriores al robo o siniestro para presentar copia certificada de la constancia correspondiente levantada ante una Autoridad Competente, que acredite el objeto de robo o siniestro para que no tenga costo la reposición del equipo, en caso de no presentarla el SUSCRIPTOR tendrá que pagar el valor total del equipo, mismo que se puede visualizar en la página de EL PROVEEDOR a través del link https://inter-fem.com/.\n\n' +
                  'En caso de terminación, rescisión o cancelación del presente Contrato, EL SUSCRIPTOR se obliga a brindar las facilidades para que el PROVEEDOR retire el Equipo completo (antena, router, mástil y cableado) a más tardar dentro del plazo de 10 (diez) días naturales contados a partir de la fecha en que notifique la terminación del Contrato.\n\n' +
                  'Si al término o rescisión del Contrato, el SUSCRIPTOR no devuelve al PROVEEDOR el Equipo que le fue entregado en comodato en términos de lo previsto en este Contrato, se le hará efectiva la garantía de cumplimiento de obligación consistente en un pagaré que es causal y no negociable; es decir que este pagaré sólo se firma por EL SUSCRIPTOR para garantizar la devolución del Equipo que le fue entregado en comodato.\n\n' +
                  'Sí al finalizar la relación contractual y el SUSCRIPTOR sí haya devuelto al PROVEEDOR el equipo que le fue entregado en comodato, el PROVEEDOR tiene la obligación de devolver el pagaré establecido en el Anexo 1 del presente contrato al SUSCRIPTOR.\n\n' +
                  'En el momento en el que, el SUSCRIPTOR realice la devolución del Equipo, el PROVEEDOR le debe proporcionar una nota de recepción, la cual deberá contener el número de teléfono, nombre del SUSCRIPTOR y nombre de la persona que lo entrega y lo recibe. En el supuesto que el SUSCRIPTOR no devuelva el equipo a la terminación del contrato, el PROVEEDOR podrá hacer valer el pagaré establecido en el Anexo 1.\n\n' +
                  'CUARTA: INSTALACIÓN Y ACTIVACIÓN. La instalación y activación del equipo terminal no podrá ser mayor a 10 días hábiles a partir de la firma del presente contrato.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  'En caso de que el PROVEEDOR no pueda iniciar la prestación del servicio por causas atribuibles a él por imposibilidad física o técnica para la instalación del equipo, debe devolver al SUSCRIPTOR las cantidades que haya pagado por concepto de anticipo, en un plazo no mayor de 30 días hábiles siguientes a la fecha límite establecida para la instalación, y se tendrá por terminado el contrato de adhesión sin responsabilidad para el SUSCRIPTOR, debiendo pagar el PROVEEDOR una penalidad equivalente al 20% de las cantidades que haya recibido por concepto de anticipo, por su incumplimiento en los casos atribuibles a él.\n\n' +
                  'El SUSCRIPTOR puede negarse, sin responsabilidad alguna para él, a la instalación o activación del servicio ante la negativa del personal del PROVEEDOR a identificarse y/o a mostrar la orden de trabajo. Situación que debe informar al PROVEEDOR en ese momento.\n\n' +
                  'EL PROVEEDOR informará a “EL SUSCRIPTOR” previo a la contratación, cuáles son los requerimientos mínimos para la correcta Instalación.\n\n' +
                  'EL SUSCRIPTOR tomará todas las medidas necesarias para proteger la información de su propiedad y/o software.\n\n' +
                  'EL PROVEEDOR no será responsable de daños que se causen por piratas informáticos y/o virus transmitidos a través de Internet.\n\n' +
                  'Con motivo del presente Contrato el PROVEEDOR no es ni será responsable de la instalación de ninguna red de área local (LAN), así como tampoco de la configuración de ningún dispositivo con excepción del Equipo necesario para la instalación y prestación de los Servicios Contratados.\n\n' +
                  'EL PROVEEDOR entregará el servicio de internet fijo en el punto de demarcación, el cual es en todos los casos el último bloque del equipo terminal, punto en el que se ubica el conector de red RJ- 45 para su conexión de forma alámbrica a la red local de “EL SUSCRIPTOR”, por lo que cualquier medición de velocidad del Plan contratado deberá de tomarse en este punto de demarcación.\n\n'+
                  'QUINTA: TARIFAS. Las tarifas del servicio se encuentran inscritas en el Registro Público de Concesiones del IFT y pueden ser consultadas en la página del IFT www.ift.org.mx.\n\n' +
                  'Las tarifas no podrán establecer condiciones contractuales tales como causas de terminación anticipada o cualquier otra condición que deba ser pactada dentro de los contratos de adhesión. De igual manera, no se podrán establecer términos y/o condiciones de aplicación de las tarifas que',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  'contravengan a lo establecido en el presente contrato de adhesión.\n\n' +
                  'Los planes, paquetes, cobertura donde el PROVEEDOR puede prestar el servicio y tarifas se pueden consultar por los medios establecidos en la carátula del presente contrato.\n\n' +
                  'En caso de que ambas partes se sujeten a un plazo forzoso, el PROVEEDOR no puede modificar dentro de dicho plazo, el precio o tarifa contratados, bajo ningún supuesto, salvo que se trate de una disminución del precio o el incremento del paquete de servicios sin variación del precio del mismo.\n\n' +
                  'SEXTA: SERVICIOS ADICIONALES. El PROVEEDOR puede ofrecer servicios y/o productos adicionales al SERVICIO originalmente contratado siempre y cuando sea acordado entre las partes y el SUSCRIPTOR lo solicite y autorice a través de medios físicos, electrónicos, digitales o de cualquier otra nueva tecnología que lo permita. El PROVEEDOR deberá contar con la opción de ofrecer al SUSCRIPTOR cada servicio adicional o producto por separado, debiendo dar a conocer el precio previamente a su contratación.\n\n' +
                  'El PROVEEDOR puede ofrecer planes o paquetes que incluyan los servicios y/o productos que considere convenientes, siempre y cuando tenga el consentimiento expreso del SUSCRIPTOR para tal efecto. Sin embargo, no puede obligar al SUSCRIPTOR a contratar servicios adicionales como requisito para la contratación o continuación de la prestación del SERVICIO\n\n' +
                  'El SUSCRIPTOR puede cancelar los servicios adicionales al SERVICIO originalmente contratado en cualquier momento, por los medios señalados en la carátula para tales efectos, para lo que el PROVEEDOR tiene un plazo máximo de 5 días naturales a partir de dicha manifestación para cancelarlo, sin que ello implique la suspensión o cancelación de la prestación del SERVICIO originalmente contratado. La cancelación de los Servicios adicionales al SERVICIO originalmente contratado no exime al SUSCRIPTOR del pago de las cantidades adeudadas por los servicios adicionales utilizados.\n\n' +
                  'SÉPTIMA: ESTADO DE CUENTA RECIBO Y/O FACTURA. El PROVEEDOR debe entregar gratuitamente en el domicilio del SUSCRIPTOR, con al menos 10 días naturales antes de la fecha de vencimiento del plazo para el pago del SERVICIO contratado, un estado de cuenta, recibo y/o factura, el cual deberá de contener de manera desglosada la descripción de los cargos, costos, conceptos y naturaleza del SERVICIO y de los servicios adicionales contratados.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  'El SUSCRIPTOR puede pactar con el PROVEEDOR para que, en sustitución de la obligación referida, pueda consultarse el citado estado de cuenta y/o factura, a través de cualquier medio físico o electrónico o digital o de cualquier otra nueva tecnología que lo permita y que al efecto se acuerde entre ambas partes.\n\n' +
                  'La fecha, forma y lugares de pago se pueden consultar por los medios señalados en la carátula del presente contrato.\n\n' +
                  'Tratándose de cargos indebidos, el PROVEEDOR deberá efectuar la devolución correspondiente dentro de un plazo no mayor a los 5 días hábiles posteriores a la reclamación. Dicha devolución se efectuará por el mismo medio en el que se realizó el cargo indebido correspondiente y se deberá bonificar el 20% sobre el monto del cargo realizado indebidamente.\n\n' +
                  'OCTAVA: MODIFICACIONES. El PROVEEDOR dará aviso al SUSCRIPTOR, cuando menos con 15 días naturales de anticipación, de cualquier cambio en los términos y condiciones originalmente contratados. Dicho aviso deberá ser notificado a través de medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita.\n\n' +
                  'En caso de que el SUSCRIPTOR no esté de acuerdo con el cambio de los términos y condiciones originalmente contratados, podrá optar por exigir el cumplimiento forzoso del contrato bajo las condiciones en que se firmó el mismo, o a solicitar la terminación del presente contrato sin penalidad alguna para el SUSCRIPTOR dentro de los 30 (treinta) días naturales siguientes al aviso contemplado.\n\n' +
                  'El PROVEEDOR deberá obtener el consentimiento del SUSCRIPTOR a través de medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita, para poder dar por terminado el presente contrato con la finalidad de sustituirlo por otro, o bien para la modificación de sus términos y condiciones. No se requerirá dicho consentimiento cuando la modificación genere un beneficio en favor del SUSCRIPTOR.\n\n' +
                  'En caso de que el contrato sea celebrado a un plazo forzoso, el PROVEEDOR no puede modificar las condiciones ofrecidas y pactadas, salvo que medie autorización del Consumidor, por cualquier medio establecido en la Ley. El SUSCRIPTOR puede cambiar de tarifa, paquete o plan, aunque sea de menor monto con el que se contrató, en cualquier momento, pagando en su caso los cargos adicionales que se generen asociados a este cambio.\n\n'+
                  'NOVENA: SUSPENSIÓN DEL SERVICIO. El PROVEEDOR podrá suspender el Servicio, previa notificación por escrito al SUSCRIPTOR, a través de los',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  'medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita o del medio que él elija, si este último incurre en cualquiera de los siguientes supuestos:\n\n' +
                  '1.Por pagos parciales de la tarifa aplicable al SERVICIO.\n\n' +
                  '2.Por falta de pago del SERVICIO después de 5 días naturales posteriores a la fecha de pago señalada en la carátula del presente contrato.\n\n' +
                  '3.Por utilizar el servicio de manera contraria a lo previsto en el contrato y/o a las disposiciones aplicables en materia de telecomunicaciones.\n\n' +
                  '4.Por alterar, modificar o mover el equipo terminal.\n\n' +
                  '5.Por declaración judicial o administrativa.\n\n' +
                  'Una vez solucionada la causa que originó la suspensión del servicio, el PROVEEDOR deberá reanudar la prestación del servicio en un periodo máximo de 48 horas, debiendo pagar el SUSCRIPTOR los gastos por reconexión, lo cual no podrá ser superior al 20% del pago de una mensualidad.\n\n' +
                  'Para el caso de los Servicios de Telecomunicaciones que requieren reconexión manual o presencia física la reanudación del servicio de telecomunicaciones debe realizarse en un periodo máximo de hasta setenta y dos horas contadas a partir de la fecha en que la suspensión temporal haya sido solventada.\n\n' +
                  'DÉCIMA: CONTINUIDAD DEL SERVICIO Y BONIFICACIONES POR INTERRUPCIÓN. El PROVEEDOR deberá bonificar y compensar al SUSCRIPTOR en los siguientes casos:\n\n' +
                  '1. Cuando por causas atribuibles al PROVEEDOR no se preste el servicio de telecomunicaciones en la forma y términos convenidos, contratados, ofrecidos o implícitos o información desplegada en la publicidad del proveedor, así como con los índices y parámetros de calidad contratados o establecidos por el IFT, éste debe de compensar al SUSCRIPTOR la parte proporcional del precio del servicio, plan o paquete que se dejó de prestar y como bonificación al menos el 20% del monto del periodo de afectación de la prestación del servicio.\n\n' +
                  '2. Cuando la interrupción del servicio sea por casos fortuitos o de fuerza mayor, si la misma dura más de 24 horas consecutivas siguientes al reporte que realice el SUSCRIPTOR, el PROVEEDOR hará la compensación por la parte proporcional del periodo en que se dejó de prestar el servicio contratado, la cual se verá reflejada en el siguiente recibo y/o factura. Además, el PROVEEDOR deberá bonificar por lo menos el 20% del monto del periodo de afectación.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  '3. Cuando se interrumpa el servicio por alguna causa previsible que repercuta de manera generalizada o significativa en la prestación del servicio, la misma no podrá afectar el servicio por más de 24 horas consecutivas; el PROVEEDOR dejará de cobrar al SUSCRIPTOR la parte proporcional del precio del servicio que se dejó de prestar, y deberá bonificar por lo menos el 20% del monto del periodo que se afectó.\n\n' +
                  '4. Cuando el PROVEEDOR realice cargos indebidos, deberá bonificar el 20% sobre el monto del cargo realizado indebidamente.\n\n' +
                  'A partir de que el PROVEEDOR reciba la llamada por parte del SUSCRIPTOR para reportar las fallas y/o interrupciones en el SERVICIO, el PROVEEDOR procederá a verificar el tipo de falla y con base en ello, se determinará el tiempo necesario para la reparación, el cual no puede exceder las 24 horas siguientes a la recepción del reporte.\n\n' +
                  'DÉCIMA PRIMERA: MECANISMOS DE BONIFICACIÓN Y COMPENSACIÓN. En caso de que proceda la bonificación y/o compensación, el PROVEEDOR se obliga a:\n\n' +
                  '1. Realizarlas a más tardar en la siguiente fecha de corte a partir de que se actualice algunos de los supuestos descritos en la cláusula anterior.\n\n' +
                  '2. Reflejar en el siguiente estado de cuenta o factura, la bonificación y/o compensación realizada, y\n\n' +
                  '3. Dicha bonificación y/o compensación se efectuará por los medios que pacten las partes.\n\n'+
                  'DÉCIMA SEGUNDA: TERMINACIÓN Y CANCELACIÓN DEL CONTRATO. El Presente contrato se podrá cancelar por cualquiera de las partes sin responsabilidad para ellas en los siguientes casos:\n\n'+
                  'a) Por la imposibilidad permanente del PROVEEDOR para continuar con la prestación del SERVICIO, ya sea por caso fortuito o fuerza mayor.\n\n'+
                  'b) Si el SUSCRIPTOR no subsana en un término de 30 días naturales cualquiera de las causas que dieron origen a la suspensión del SERVICIO.\n\n'+
                  'c) Si el SUSCRIPTOR conecta aparatos adicionales por su propia cuenta, subarrienda, cede o en cualquier forma traspasa los derechos establecidos en el contrato, sin la autorización previa y por escrito del PROVEEDOR.\n\n'+
                  'd) Si el PROVEEDOR no presta el SERVICIO en la forma y términos convenidos, contratados, ofrecidos o implícitos en la información desplegada en la publicidad del proveedor, así como con los índices y parámetros de calidad contratados o establecidos por el IFT.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  'e) Si el SUSCRIPTOR proporciona al PROVEEDOR información falsa para la contratación del Servicio.\n\n' +
                  'f) En caso de modificación unilateral de los términos, condiciones y tarifas establecidas en el presente contrato por parte del PROVEEDOR.\n\n' +
                  'g) Por cualquier otra causa prevista en la legislación aplicable y vigente.\n\n' +
                  'El SUSCRIPTOR podrá dar por terminado el contrato en cualquier momento, dando únicamente el aviso al proveedor a través del mismo medio en el cual contrató el servicio, o a través los medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita. La cancelación o terminación del Contrato no exime al SUSCRIPTOR de pagar al PROVEEDOR los adeudos generados por el/los Servicio(s) efectivamente recibido(s).\n\n' +
                  'El PROVEEDOR realizará la devolución de las cantidades que en su caso el SUSCRIPTOR haya dado por adelantado y que correspondan a la parte proporcional del servicio que con motivo de la cancelación no se haya prestado efectivamente por parte del PROVEEDOR.\n\n' +
                  'En caso de terminación del presente contrato, el PROVEEDOR debe proporcionar un folio o número de registro al SUSCRIPTOR, mismo que puede ser entregado, a elección del SUSCRIPTOR, a través de medios físicos o electrónicos o digitales o de cualquier otra nueva tecnología que lo permita.\n\n' +
                  'DÉCIMA TERCERA: USO DEL SERVICIO DE INTERNET FIJO EN CASA. La utilización del SERVICIO puede integrar imágenes, sonidos, textos y/o contenidos que se pueden considerar ofensivos o no aptos para menores de edad, por lo que el acceso a los mismos corre por cuenta y riesgo del SUSCRIPTOR.\n\n' +
                  'Es responsabilidad del SUSCRIPTOR llevar a cabo las medidas requeridas para cuidar y salvaguardar su información, datos y/o software de su propiedad, de accesos desde internet a sus dispositivos o, en su caso, evitar una contaminación por virus o ataques de usuarios de internet, por lo que el PROVEEDOR no será responsable de cualquier daño y perjuicio causado al SUSCRIPTOR por los hechos antes mencionados.\n\n' +
                  'EL PROVEEDOR no es responsable de la configuración de dispositivos que resulten necesarios para el uso concurrente del o de los Equipos Personales.\n\n' +
                  'El SERVICIO está sujeto a una cuota mensual de navegación de descarga que se determinará en el Paquete contratado por el SUSCRIPTOR, por lo que el PROVEEDOR proporcionará la información del consumo total de datos en el periodo de facturación correspondiente.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  'El PROVEEDOR cumplirá con la neutralidad de las redes que se encuentra establecida en Ley Federal de Telecomunicaciones y Radiodifusión y en los lineamientos que en su momento emita el IFT.\n\n' +
                  'DÉCIMA CUARTA: ACCESIBILIDAD PARA PERSONAS CON DISCAPACIDAD. En cuanto a la contratación para usuarios con discapacidad, el PROVEEDOR estará obligado a poner a disposición del SUSCRIPTOR la utilización de otros medios de comunicación para dar a conocer las condiciones establecidas en el presente contrato, así como los servicios adicionales y los paquetes que ofrezca el PROVEEDOR.\n\n' +
                  'DÉCIMA QUINTA: NO DISCRIMINACIÓN. El PROVEEDOR debe prestar el SERVICIO en condiciones equitativas a todo aquel que lo solicite, sin establecer privilegios o distinciones en forma discriminatoria respecto de otros SUSCRIPTORES en la misma área de cobertura y en las mismas condiciones de contratación.\n\n' +
                  'En caso de que el PROVEEDOR ofrezca condiciones más favorables a uno o más suscriptores situados en supuestos equivalentes o similares, el SUSCRIPTOR puede exigir las mismas condiciones, siempre y cuando sea posible técnicamente para la prestación del Servicio.\n\n' +
                  'DÉCIMA SEXTA: PROTECCIÓN DE DATOS PERSONALES. El PROVEEDOR está obligado a proteger y tratar conforme a la normatividad aplicable, los datos personales que le sean proporcionados por el SUSCRIPTOR.\n\n' +
                  'El PROVEEDOR debe poner a disposición del SUSCRIPTOR el aviso de privacidad para que pueda ejercer alguno de sus derechos, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.\n\n' +
                  'Para utilizar la información del SUSCRIPTOR con fines mercadotécnicos o publicitarios; así como para enviarle publicidad sobre bienes, productos o servicios, el PROVEEDOR debe obtener previamente el consentimiento expreso del SUSCRIPTOR a través de la carátula del presente contrato.\n\n'+
                  'DÉCIMA SÉPTIMA: CARTA DE DERECHOS MÍNIMOS. El PROVEEDOR dará a conocer al SUSCRIPTOR la carta de derechos mínimos de los usuarios de los servicios públicos de telecomunicaciones al momento de realizar el procedimiento de contratación del plan respectivo y la mantendrá de manera permanente en su página de Internet.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  'El PROVEEDOR deberá respetar en todo momento los derechos establecidos en el Acuerdo mediante el cual la Procuraduría Federal del Consumidor y el Instituto Federal de Telecomunicaciones, determinan los derechos mínimos que deben incluirse en la carta a que hace referencia el artículo 191 de la Ley Federal de Telecomunicaciones y Radiodifusión.\n\n' +
                  'DÉCIMA OCTAVA: CONSULTAS, DUDAS, ACLARACIONES Y QUEJAS. EL SUSCRIPTOR podrá presentar sus quejas por fallas y/o deficiencias en el servicio y/o equipos; así como consultas, contrataciones, cancelaciones, sugerencias y reclamaciones al PROVEEDOR de manera gratuita por los medios señalados en la carátula del presente contrato.\n\n' +
                  'DÉCIMA NOVENA: AUTORIDAD COMPETENTE. La PROFECO es la autoridad competente en materia administrativa para resolver cualquier controversia que se suscite sobre la interpretación o cumplimiento del presente contrato de adhesión.\n\n' +
                  'Al IFT le corresponde regular y vigilar la calidad de los Servicios de Telecomunicaciones, así como el cumplimiento de las disposiciones administrativas que emita y que sean referidas la Norma Oficial Mexicana NOM-184-SCFI-2018.\n\n' +
                  'VIGÉSIMA: PROCEDIMIENTO CONCILIATORIO. Cuando se llegare a iniciar algún procedimiento conciliatorio ante la PROFECO, el PROVEEDOR no podrá interrumpir los servicios. Si el PROVEEDOR suspende los servicios una vez recibida la reclamación del SUSCRIPTOR y/o dentro de cualquier momento del procedimiento conciliatorio, la PROFECO requerirá al PROVEEDOR el restablecimiento del servicio.\n\n' +
                  'En todo caso, el SUSCRIPTOR no está exento de sus obligaciones de pago de los bienes y/o servicios contratados y utilizados, salvo cuando se haya determinado su improcedencia.\n\n' +
                  'VIGÉSIMA PRIMERA: DATOS REGISTRALES. Este modelo de Contrato de Adhesión, se encuentra registrado en la Procuraduría Federal del Consumidor, con el número 484-2023 de fecha 25 del mes de septiembre del año 2023.\n\n' +
                  'Asimismo, el SUSCRIPTOR podrá consultar dicho registro en la liga de acceso a Internet https://burocomercial.profeco.gob.mx/ca_spt/Tecnologías Fem, S.A.S. de C.V.!!Interfem 484-2023.pdf y en el siguiente código:',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      { text: '', pageBreak: 'before' },
      {
        table: {
          widths: ['30%', '0%', '70%'],
          body: [
            [
              {
                image: logo,
                width: 180,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 0,
                    x2: 0, y2: 0,
                    lineWidth: 0.5
                  }
                ]
              },
              {
                alignment: 'right',
                stack: [
                  { text: 'INTERFEM', bold: true, fontSize: 9 },
                  { text: 'TECNOLOGÍAS FEM S.A.S. DE C.V.', bold: true, fontSize: 9 },
                  { text: 'RFC: TFE1801297N4', bold: true, fontSize: 9 },
                  { text: 'AVENIDA SAN ANTONIO NÚMERO 14 COLONIA', bold: true, fontSize: 9 },
                  { text: 'CENTRO SAN ANTONIO TEXCALA ZAPOTITLÁN', bold: true, fontSize: 9 },
                  { text: 'SALINAS PUEBLA', bold: true, fontSize: 9 },
                  { text: 'CAT: 238-408-31-12, 238-168-64-73, 238-374-21-28, 238-688-57-66', bold: true, fontSize: 9 },
                  { text: 'atencionaclientesinterfem@gmail.com', fontSize: 8, color: 'blue', decoration: 'underline' },
                  { text: 'https://inter-fem.com/', fontSize: 8, color: 'blue', decoration: 'underline' }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
      {
        text: '',
        alignment: 'center',
        bold: true,
        fontSize: 10,
        margin: [0, 20, 0, 20]
      },
      {
        image: 'sello.png', // Asegúrate que la imagen exista en tu carpeta
        width: 80,
        alignment: 'left',
        margin: [0, 0, 0, 10]
      },
      {
        columns: [
          {
            width: '49%',
            stack: [
              {
                text:
                  'Cualquier diferencia entre el texto del contrato de adhesión registrado ante la Procuraduría Federal del Consumidor y el utilizado en perjuicio del SUSCRIPTOR, se tendrá por no puesta.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          },
          {
            width: '49%',
            stack: [
              {
                text:
                  'Los contratos de adhesión registrados ante la PROFECO deberán utilizarse en todas sus operaciones comerciales y corresponder fielmente con los modelos de contrato registrados por la misma, estar publicados de manera permanente en la página en Internet del PROVEEDOR y disponibles para su consulta a través de medios electrónicos, digitales o de cualquier otra nueva tecnología que lo permita, sin perjuicio de lo establecido en los Lineamientos Generales de Accesibilidad a Servicios de Telecomunicaciones para los Usuarios con Discapacidad que emita el IFT.',
                fontSize: 9,
                alignment: 'justify'
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      }
             
    ],
    footer: function(currentPage, pageCount) {
      return {
        text: `Página ${currentPage} de ${pageCount}`,
        alignment: 'center',
        fontSize: 8,
        margin: [0,0, 0,0]  
      };
    },    
  styles: {
    sectionHeader: {
      fontSize: 13,
      bold: true,
      margin: [0, 10, 0, 5],
      decoration: 'underline'
    },
  }
};

// Generar y guardar PDF
const pdfDoc = printer.createPdfKitDocument(docDefinition);
  const outputDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  // 🧼 Normaliza el nombre del usuario
  const nombreArchivo = (data.nombre || "usuario")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")        // Quitar tildes
    .replace(/[\/\\?%*:|"<>]/g, "")         // Quitar caracteres inválidos
    .trim();

  // 📅 Obtener la fecha actual en formato YYYY-MM-DD
  const fechaHoy = new Date().toISOString().slice(0, 10);  // ejemplo: '2025-03-22'

  // 📄 Construir nombre del archivo PDF
  const archivoFinal = `${nombreArchivo}_${fechaHoy}.pdf`;
  const outputPath = path.join(outputDir, archivoFinal);
  const stream = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(stream);
    pdfDoc.end();
  
    stream.on("finish", async () => {
      try {
        // ✅ Solo si el cliente autorizó el envío por correo
        if ((data.autorizacion_contrato || "").toLowerCase() === "si") {
          const nodemailer = require("nodemailer");
  
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "pedroeduardomorocruz@gmail.com",
              pass: "luvo hlgd ejtc fzbz" // ← Contraseña de aplicación
            }
          });
  
          await transporter.sendMail({
            from: "pedroeduardomorocruz@gmail.com",
            to: data.correo_autorizado,
            subject: "Tu contrato de servicio de internet",
            text: `Hola ${data.nombre || ""}, adjunto encontrarás tu contrato en PDF.`,
            attachments: [
              {
                filename: archivoFinal,
                path: outputPath
              }
            ]
          });
  
          console.log("📧 Contrato enviado a", data.correo_autorizado);
        } else {
          console.log("📭 El cliente no autorizó el envío del contrato por correo.");
        }
  
        resolve(outputPath);
      } catch (error) {
        console.error("❌ Error al enviar el correo:", error);
        reject(error);
      }
    });
  
    stream.on("error", reject);
  });
  
}

module.exports = generarPDF;
