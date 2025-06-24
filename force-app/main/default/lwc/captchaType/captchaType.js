import {
    LightningElement,
    api,
    track
} from 'lwc';
export default class CaptchaType extends LightningElement {
    @track getprogreshbar = 'Select';
    @track Captcha = false;
    @track Slider_Captcha = false;
    @track Image_Captcha = false;
    @track Normal_Captcha = false;
    @track Maths_Captcha = false;
    @track showBool = false;
    alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    alphabetslength = this.alphabets.length;
    @track msg_verified_captcha = false;
    @track msg_invalid_captcha = false;
    @track get_normal_captcha_value;
    @track get_math_captcha_value;
    @track normal_captcha;
    @track sum_mat_captcha;
    @track mat_captcha_1;
    @track mat_captcha_2;
    @track set_normal_captcha_value = '';
    @track set_math_captcha_value;
    @track value = 0;
    @track styleColor;
    @track pickListValueList = [];
    @track rendomcolor;
    @track color;
    @track BackgroundColor;
    @track test;
    @track isFirstLoadedNormalCaptcha = true;
    @track slider_captcha_1;
    @api captypetypes = 'Normal_Captcha';

    connectedCallback() {
        console.log('Captcha Type connectedCallback() -------->');
        this.generate_new_math_captcha();
        // this.generate_new_normal_captcha();
        this.generate_new_slider_captcha();
        this.getrendomcolore();
        this.createNewNormalCaptcha();
        if (this.captypetypes != undefined) {
            this.preview_chptchatype(this.captypetypes);
        }
        console.log('<-------- Captcha Type connectedCallback()');
    }

    renderedCallback(){
        console.log('Captcha Type renderedCallback() -------->');
        if(this.Normal_Captcha && this.isFirstLoadedNormalCaptcha) {
            this.isFirstLoadedNormalCaptcha = false;
            this.createNewNormalCaptcha();
        }
        console.log('<-------- Captcha Type renderedCallback()');
    }

    createNewNormalCaptcha() {
        console.log('In createNewNormalCaptcha()');
        //to generate random 6 characters for captcha
        var charsArray = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) { //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
            else i--;
        }

        var canv = this.template.querySelector(".captchaCanvas");
        if(canv != null && canv != undefined) {
            const width = canv.width;
            const height = canv.height;
            var ctx = canv.getContext("2d");
            ctx.clearRect(0, 0, width, height);
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 10, 30);

            for (let i = 0; i < 6; i++) { drawLine(); }

            this.normal_captcha = captcha.join("");
            this.template.querySelector(".captchaDiv").appendChild(canv);
            this.set_normal_captcha_value = null;
            this.msg_invalid_captcha = false;
            this.msg_verified_captcha = false;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
            
            function drawLine() {
                ctx.beginPath();
                ctx.moveTo(Math.random() * width, Math.random() * height);
                ctx.lineTo(Math.random() * width, Math.random() * height);
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
        }

    }

    // Start Captcha 1 Normal Captcha
    verify_normal_captcha(event) {
        // this.get_normal_captcha_value = event.target.value;
        this.get_normal_captcha_value = this.template.querySelector('input[data-id=normal_captch_usr_input]').value;
        console.log('re ' + this.normal_captcha);
        console.log('input ' + this.get_normal_captcha_value);
        if (this.get_normal_captcha_value == this.normal_captcha) {
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            this.set_normal_captcha_value = this.get_normal_captcha_value;
            // Creates the event with the data.
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        } else {
            console.log('Invalid Captcha');
            // this.generate_new_normal_captcha();
            this.createNewNormalCaptcha();
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false;
            this.set_normal_captcha_value = null;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        }
    }
    @api generate_new_normal_captcha() {
        this.first = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.second = Math.floor(Math.random() * 10);
        this.third = Math.floor(Math.random() * 10);
        this.fourth = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.fifth = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.sixth = Math.floor(Math.random() * 10);
        this.normal_captcha = this.first + this.second + this.third + this.fourth + this.fifth + this.sixth;
        this.set_normal_captcha_value = null;
        this.msg_invalid_captcha = false;
        this.msg_verified_captcha = false;
        const selectedEvent = new CustomEvent("captchaverification", {
            detail: this.msg_verified_captcha
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
    // End Captcha 1 Normal Captcha

    // Start Captcha 2 Math Captcha
   @api generate_new_math_captcha() {
        this.mat_captcha_1 = Math.floor(Math.random() * 100);
        this.mat_captcha_2 = Math.floor(Math.random() * 10);
        this.sum_mat_captcha = parseInt(this.mat_captcha_1) + parseInt(this.mat_captcha_2);
        this.set_math_captcha_value = null;
        this.msg_invalid_captcha = false;
        this.msg_verified_captcha = false;
        const selectedEvent = new CustomEvent("captchaverification", {
            detail: this.msg_verified_captcha
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    verify_math_captcha(event) {
        this.get_math_captcha_value = this.template.querySelector('input[data-id=math_captch_usr_input]').value;
        console.log('re ' + this.sum_mat_captcha);
        console.log('input ' + this.get_math_captcha_value);
        if (this.get_math_captcha_value == this.sum_mat_captcha) {
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            this.set_math_captcha_value = this.get_math_captcha_value;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        } else {
            this.generate_new_math_captcha();
            console.log('Invalid Captcha');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false;
            this.set_math_captcha_value = null;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        }

    }


    // End Captcha 2 Math Captcha

    // Start Captcha 3 Slider Captcha
   @api generate_new_slider_captcha() {
        this.slider_captcha_1 = Math.floor(Math.random() * 50);
    }
    testch(event) {
        this.value = event.target.value;

    }
    handleValueChange() {
        console.log('test log');

        if (this.value == this.slider_captcha_1) {
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        } else {
            console.log('Invalid Captcha');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        }

    }
    // End Captcha 3 Slider Captcha



   @api getrendomcolore() {
        this.pickListValueList = [];
        for (var i = 1; i <= 8; i++) {
            // console.log(i);
            const letter = "0123456789ABCDEF";
            this.color = "#";
            for (let j = 0; j < 6; j++) {
                this.color += letter[Math.floor(Math.random() * 16)];
            }
            // console.log(this.color);
            this.BackgroundColor = 'background-color:' + this.color;

            this.pickListValueList.push(this.BackgroundColor);
            this.rendomcolor = this.pickListValueList[Math.floor(Math.random() * 8)];
        }
        // console.log('hoiiii ' +this.pickListValueList);
        // this.msg_verified_captcha=false;
        // this.msg_invalid_captcha = false;
        this.msg_verified_captcha = false;
        const selectedEvent = new CustomEvent("captchaverification", {
            detail: this.msg_verified_captcha
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
    verfication_color_captcha(event) {
        this.test = event.target.dataset.name;
        if (this.test == this.rendomcolor) {
            // alert('you are verified');
            // this.pickListValueList=null;
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        } else {
            // alert('you are select wrong option');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false;
            this.getrendomcolore();
            const selectedEvent = new CustomEvent("captchaverification", {
                detail: this.msg_verified_captcha
            });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);

        }
    }




    @api preview_chptchatype(strString) {
        this.getprogreshbar = strString;
        console.log('yash ', this.getprogreshbar);
        if (this.getprogreshbar == 'Select') {
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }else if (this.getprogreshbar == 'Slider_Captcha') {
            this.Captcha = false;
            this.Slider_Captcha = true;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }else if (this.getprogreshbar == 'Image_Captcha') {
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = true;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }else if (this.getprogreshbar == 'Normal_Captcha') {
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = true;
            this.Maths_Captcha = false;
        }else if (this.getprogreshbar == 'Maths_Captcha') {
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = true;
        }

    }
    @api error_msg() {
        this.msg_invalid_captcha = false;
        this.msg_verified_captcha = false;
    }


}