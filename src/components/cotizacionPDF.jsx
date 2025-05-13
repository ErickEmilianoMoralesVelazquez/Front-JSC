import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  header: { fontSize: 12, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  infoGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid black",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5 solid #ccc",
    padding: 4,
  },
  cell: { flex: 1, paddingHorizontal: 2 },
  footer: { marginTop: 20, fontSize: 9 },
  terms: { marginTop: 10, fontSize: 8, lineHeight: 1.5 },
});

const items = [
  ["779904", "BUJIA ESTANDAR SILVERADO", "PIEZA", "PEDIDO", "24", "58.00$", "1,392.00$"],
  ["C-7971", "FILTRO DE ACEITE", "PIEZA", "EXISTENCIA", "3", "71.55$", "214.65$"],
  ["A-6523", "FILTRO DE AIRE", "PIEZA", "EXISTENCIA", "3", "180.31$", "540.92$"],
  ["WF10477", "FILTRO DE GASOLINA", "PIEZA", "PEDIDO", "3", "284.08$", "852.24$"],
  ["A-170X", "CRUCETAS", "PIEZA", "PEDIDO", "12", "199.75$", "2,397.00$"],
  ["9208495", "RIMULA R4 X 15W40 D209L", "TAMBO", "EXISTENCIA", "1", "20,251.15$", "20,251.15$"],
  ["FLT1076835", "JUEGO DE CLUTCH", "PIEZA", "PEDIDO", "1", "10,475.80$", "10,475.80$"],
  ["303", "TRAPO INDUSTRIAL", "KILO", "PEDIDO", "30", "60.00$", "1,800.00$"],
];

const CotizacionPDF = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>COTIZACIÓN PARA: FOLIO VT-COT0082-130325</Text>

      <View style={styles.section}>
        <View style={styles.infoGrid}>
          <Text>Cliente ID: 1955</Text>
          <Text>FECHA: 14/03/2025</Text>
        </View>
        <View style={styles.infoGrid}>
          <Text>Nombre: FERNANDO CRIOLLO // LIC. CRESCENCIO</Text>
          <Text>VÁLIDO HASTA: 13/04/2025</Text>
        </View>
        <View style={styles.infoGrid}>
          <Text>Compañía: GAS URBANO // COBAMA</Text>
          <Text>MONEDA: MXN</Text>
        </View>
        <View style={styles.infoGrid}>
          <Text>Email: admin@gasurbano.com.mx</Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, flex: 1 }}>CÓDIGO</Text>
        <Text style={{ ...styles.cell, flex: 3 }}>DESCRIPCIÓN</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>PRES.</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>DISP.</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>Q</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>PRECIO</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>SUBTOTAL</Text>
      </View>

      {items.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          {item.map((text, i) => (
            <Text style={{ ...styles.cell, flex: i === 1 ? 3 : 1 }} key={i}>{text}</Text>
          ))}
        </View>
      ))}

      <View style={{ marginTop: 10, fontSize: 10 }}>
        <Text>Subtotal: 37,923.76$</Text>
        <Text>IVA: 6,067.80$</Text>
        <Text style={{ fontWeight: "bold" }}>TOTAL: 43,991.56$</Text>
      </View>

      <View style={styles.terms}>
        <Text>TERMINOS Y CONDICIONES</Text>
        <Text>¡SI TIENE ALGUNA PREGUNTA SOBRE ESTA COTIZACIÓN, POR FAVOR, PÓNGASE EN CONTACTO CON NOSOTROS!</Text>
        <Text>PRECIOS Y DISPONIBILIDAD SUJETOS A CAMBIO SIN PREVIO AVISO</Text>
        <Text>Teléfonos: 777 124 4076 - 55 7572 0981</Text>
        <Text>Email: csc@jorgeslubricantes.com.mx</Text>
        <Text>
          Los productos sobre pedido se solicitan después de haber recibido su pago de contado con tiempo de entrega de 15 a 20 días hábiles aprox.
        </Text>
      </View>
    </Page>
  </Document>
);

export default CotizacionPDF;
