// components/RequisitionPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  tableHeader: { flexDirection: 'row', borderBottom: '1 solid black', fontWeight: 'bold' },
  row: { flexDirection: 'row', borderBottom: '1 solid #ddd', paddingVertical: 2 },
  cell: { flex: 1, padding: 2 },
});

const RequisitionPDF = ({ form }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>ID del pedido: {form.id}</Text>
        <Text>Fecha: {form.fecha}</Text>
        <Text>Indicaciones: {form.indicaciones || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Items</Text>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.cell, flex: 3 }}>Nombre</Text>
          <Text style={{ ...styles.cell, flex: 1 }}>Cantidad</Text>
        </View>
        {form.items.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text style={{ ...styles.cell, flex: 3 }}>{item.nombre}</Text>
            <Text style={{ ...styles.cell, flex: 1 }}>{item.cantidad}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default RequisitionPDF;
