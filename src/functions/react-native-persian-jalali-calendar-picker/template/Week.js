import {Text, View} from 'react-native';
import React from 'react';
import colors from '../../colors';
const main_style = {
    wrap: {
        flex: 1,
        padding: 5,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.darkGray,
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        color: '#ffffff',
        flex: 1,
        textAlign: 'center',
        paddingBottom: 4,
    },
};

export default (props) => {
    const {
        weekStyleWrap = {},
        weekStyleText = {},
        weeks = [
            'ش',
            'ی',
            'د',
            'س',
            'چ',
            'پ',
            'ج',
        ],
    } = props;

    return (
        <View style={[main_style.wrap, weekStyleWrap]}>
            {
                weeks.map((week, index) =>
                    (<Text style={[main_style.text, weekStyleText]} key={index}>{week}</Text>))
            }
        </View>
    );
};
