import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    header: {
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    horizontalLine: {
        borderBottom: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 12,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
});

const ResourceReport = ({ resources }) => (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>University of Kelaniya</Text>
                    <Text>Sri Dharmaloka Hall</Text><br />
                    <Text>Resource Report</Text>
                    <Text>
                        Date: {new Date().toLocaleDateString()}
                        Time: {new Date().toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.section}>
                    {resources.map(resource => (
                        <View key={resource._id} style={styles.row}>
                            <Text style={styles.label}>{resource.name}:</Text>
                            <Text>{resource.quantity}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.footer}>
                    <Text>Page {'${pageNumber}'} of {'${numPages}'}</Text>
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

export default ResourceReport;
