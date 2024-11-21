import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '@/constants/Styles';

const Footer = () => {
    return (
        <View style={styles.footerBar}>
            <TouchableOpacity>
                <Text style={styles.footerLink}>FAQ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;