import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function NoteDetail({ route }) {
    // Data will be from dailynotes
    const { header, date, comment } = route.params;

    const dateObj = new Date(date);

    const formattedDate = dateObj.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Header:</Text>
                <Text style={styles.value}>{header}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{formattedDate}</Text> {/* 使用格式化后的日期 */}
            </View>
            <View style={styles.commentContainer}>
                <Text style={styles.label}>Comment:</Text>
                <Text style={styles.commentValue}>{comment}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    infoContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
    },
    commentContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 200, // 设置最大高度
    },
    commentValue: {
        fontSize: 16,
        multiline: true, // 允许多行输入
    },
});
