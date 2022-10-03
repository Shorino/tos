import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TeaSessionShowUsername } from "../../../model/tea-session/TeaSessionShowUsenameBean";
import { TeaSessionService } from "../../../service/tea-session.service";
@Component({
  selector: "app-create-session",
  templateUrl: "./create-session.component.html",
  styleUrls: ["./create-session.component.css"],
})
export class CreateSessionComponent implements OnInit {
    createSessionForm:FormGroup;

    showSessionNameEmptyError:boolean = false;
    showTreatDateEmptyError:boolean = false;
    showCutOffDateEmptyError:boolean = false;
    showMenuEmptyError:boolean = false;

    submittingForm:boolean = false;

    constructor(private formBuilder:FormBuilder,
        private router:Router,
        private teaSessionService:TeaSessionService){
        this.createSessionForm = this.formBuilder.group({
            teaSessionName:["", Validators.required],
            password:[null],
            description:[null],
            treatDate:[null, Validators.required],
            cutOffDate:[null, Validators.required],
            visibility:[true, Validators.required],
            menu:[null, Validators.required]
        });
        if(!localStorage.getItem("TOS_USER_INFO")) this.router.navigateByUrl("/");
    }

    ngOnInit(): void {
    }

    get fc(){
        return this.createSessionForm.controls;
    }

    submitCreateTeaSession(){
        if(this.createSessionForm.invalid) {
            if(this.fc.teaSessionName.errors){
                this.showSessionNameEmptyError = true;
            }
            if(this.fc.treatDate.errors){
                this.showTreatDateEmptyError = true;
            }
            if(this.fc.cutOffDate.errors){
                this.showCutOffDateEmptyError = true;
            }
            if(this.fc.menu.errors){
                this.showMenuEmptyError = true;
            }
            return;
        }
        this.submittingForm = true;
        let userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
        let teaSession = new TeaSessionShowUsername(this.fc.teaSessionName.value,
            this.fc.description.value,
            userInfo.username,
            this.fc.password.value,
            this.fc.treatDate.value,
            this.fc.cutOffDate.value,
            this.fc.visibility.value,
            this.fc.menu.value);
        this.teaSessionService.create(teaSession).subscribe(response=>{
            this.submittingForm = false;
            if(response.status){
                this.router.navigateByUrl("/tea-session/" + response.data);
            }
            else{
                alert(response.statusMessage);
            }
        });
    }

    updateMenu(event:any){
        this.showMenuEmptyError = false;
        if(!event.target.files[0]) {
            this.fc.menu.setValue(null);
            return;
        }
        let imageUrl = URL.createObjectURL(event.target.files[0]);
        let tempImg = new Image();
        tempImg.src = imageUrl;
        tempImg.onload = () =>{
            let canvas = document.createElement("canvas");
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(tempImg, 0, 0);
            let dataUrl = canvas.toDataURL("image/png");
            dataUrl = dataUrl.replace("data:image/png;base64,", "");
            this.fc.menu.setValue(dataUrl);
            URL.revokeObjectURL(imageUrl);
        }
    }
}
