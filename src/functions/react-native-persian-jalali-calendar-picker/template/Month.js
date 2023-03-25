import { Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import moment from 'moment-jalaali';
import colors from '../../../src/functions/colors';

const main_style = {
    wrap: {
        flex: 1,
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row-reverse',
    },
    TouchableOpacity: {
        borderRadius: 5,
        width: '33.3333%',
        height: 40,
        marginBottom: 5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        fontSize: 17,
        color: '#555',
    },
    backText: {
        fontSize: 25,
        color: '#555',
        alignSelf: "flex-start"
    },
};

function Selected(setCurrent, current, index, setActive) {
    return () => {
        setCurrent(moment(`${current.format('jYYYY')}/${String(index + 1).padStart(2, '0')}`, 'jYYYY/jMM'));
        setActive('calender');
    };
}

const GenerateMonth = (props) => {
    let element = [];
    const months = [
        'حوت', 'دلو', 'جدی', 'قوس', 'عقرب', 'میزان', 'سنبله', 'اسد', 'سرطان', 'جوزا', 'ثور', 'حمل',
    ], {current, primaryColor, setActive, setCurrent} = props;

    months.reverse().map((month, index) => {

        // Check is selected
        const selectedTouchableOpacity = current.format('jMMMM') === month
            ? {backgroundColor: colors.darkGray} : {};

        const selectedText = current.format('jMMMM') === month
            ? {color: '#ffffff'} : {};

        element.push(
            <TouchableOpacity onPress={Selected(setCurrent, current, index, setActive)} key={index}
                              style={[main_style.TouchableOpacity, selectedTouchableOpacity]}>
                <Text style={[main_style.text, selectedText]}>{month}</Text>
            </TouchableOpacity>);
    });

    return element;
};

export default (props) => {
    const {
        setActive,
    } = props;

    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 20, width: "100%", justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => setActive('calender')} style={{paddingRight: 20}}>
                    <Text style={main_style.backText}>×</Text>
                </TouchableOpacity>
            </View>
            <View style={main_style.wrap}>
                {GenerateMonth(props)}
            </View>
        </View>
    );
};
