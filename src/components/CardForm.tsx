import React, { Component } from 'react';
import './CardForm.scss';

interface ICardForm {
    ownerName: string
    number: number
    cvv2: number
    date: {
        month?: number | null
        year?: number | null
    }
    isFormValid?: boolean
};

class CardForm extends Component<ICardForm, ICardForm> {

    constructor (props: ICardForm) {
        super(props);
        this.state  = {
            ownerName: this.props.ownerName,
            number: this.props.number,
            cvv2: this.props.cvv2,
            date: this.props.date,
            isFormValid: false
        }
        this.cardUpdateState = this.cardUpdateState.bind(this);
    }

    public cardUpdateState (e: any, key:string): void {
        switch (key) {
            case "ownerName": {
                this.setState({ ownerName: e.target.value});
                break;}
            case "number": {
                this.setState({ number: e.target.value});
                break;}
            case "cvv2": {
                this.setState({ cvv2: e.target.value});
                break;}
            case "month": {
                this.setState({ date: {month: e.target.value}});
                break;}
            case "year":{
                this.setState({ date: {year: e.target.value}});
                break;}
        }
    }


    public cardNumberLimit (e: React.ChangeEvent<HTMLInputElement>): void {
        const num :HTMLInputElement = e.target;
        if (num.value.length > 16)
            num.value = num.value.slice(0, 16);        
        if (num.value.length === 16 && num.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/))
            this.setState({isFormValid: true})
        else this.setState({isFormValid: false})
        this.cardUpdateState(e, "number");
    }
 
    createMonthSelect = function () {
        let months: Array<JSX.Element>  = [];
        for(let i: number = 1; i<=12; i++) {
            months.push(<option value = {i} key = {i}>
                            { i < 10 ? '0'+ i : i}
                        </option>);
        }
        return months;
    }

    createYearSelect  = function () {
        let years : Array<JSX.Element> = [];
        let i = new Date().getFullYear();

        while(i< new Date().getFullYear()+10){
            years.push(<option value={i} key={i-new Date().getFullYear()}>{i}</option>)
            i++;
        }

        return years;
    }

    render() {
        return (
            <form className="card-form" method="post">
                <div className={
                    this.state.isFormValid
                    ? "card-form__fields-wrapper card-form--success"
                    : "card-form__fields-wrapper"
                }>
                    <input 
                        className="card-form__input"
                        type="text" 
                        name="ownerName" 
                        placeholder="Enter card holders"
                        value={this.state.ownerName}
                        onChange={e => this.cardUpdateState(e, "ownerName") }
                    ></input>
                    <input 
                        className="card-form__input"
                        name="number"
                        type="number" 
                        placeholder="Enter card number"
                        value={this.state.number}
                        onChange={e => this.cardNumberLimit(e) }
                        required
                    ></input>
                    {
                        this.state.isFormValid
                        ? <div className="card-form__message--success message">
                            <span className="message__info">Card number entered successfully</span>
                            </div>
                        : null
                    }
                    <div className="card-form__content-wrapper">
                        <input 
                            className="card-form__input--cvv2"
                            type="password" 
                            placeholder="CVV" 
                            required 
                            maxLength={3}
                            value={this.state.cvv2}
                            onChange={e => this.cardUpdateState(e, "cvv2") }
                            name="cvv2"
                        ></input>
                        <select 
                            className="card-form__input--month" 
                            defaultValue={
                                this.state.date.month != undefined 
                                ?this.state.date.month 
                                :new Date().getMonth()+2}
                            name="month"
                            onChange={e => this.cardUpdateState(e, "month") }
                        > 
                            {this.createMonthSelect()}
                        </select>
                        <select 
                            className="card-form__input--year" 
                            defaultValue={
                                new Date().getMonth() === 11
                                ?new Date().getFullYear()+1
                                :new Date().getFullYear()}
                            name="year"
                            onChange={e => this.cardUpdateState(e, "year") }
                        >
                            {this.createYearSelect()}
                        </select>
                    </div>
                </div>
                <button 
                    className="card-form__submit-btn" 
                    type="submit" 
                    disabled={!this.state.isFormValid}
                >
                    Submit
                </button>
            </form>
        )
    }
}

export default CardForm;