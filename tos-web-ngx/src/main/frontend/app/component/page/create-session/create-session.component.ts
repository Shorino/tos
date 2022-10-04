import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TeaSessionChangePassword, TeaSessionChangePasswordAdmin } from "../../../model/tea-session/TeaSessionChangePassword";
import { TeaSessionHidePassword } from "../../../model/tea-session/TeaSessionHidePassword";
import { TeaSessionShowUsername } from "../../../model/tea-session/TeaSessionShowUsenameBean";
import { TeaSessionService } from "../../../service/tea-session.service";

enum PageMode {
  create,
  modify,
  modifyPassword,
}

@Component({
  selector: "app-create-session",
  templateUrl: "./create-session.component.html",
  styleUrls: ["./create-session.component.css"],
})
export class CreateSessionComponent implements OnInit {
  userInfo: any = null;
  teaSessionInfo: TeaSessionHidePassword = new TeaSessionHidePassword();

  createSessionForm: FormGroup;
  changePasswordForm: FormGroup;

  showSessionNameEmptyError: boolean = false;
  showTreatDateEmptyError: boolean = false;
  showCutOffDateEmptyError: boolean = false;
  showMenuEmptyError: boolean = false;

  submittingForm: boolean = false;

  @Input()
  pageMode: PageMode = PageMode.create;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private teaSessionService: TeaSessionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
    if (!this.userInfo) this.router.navigateByUrl("/login");

    this.activatedRoute.params.subscribe((params) => {
      if (params.teaSessionId) {
        this.teaSessionService
          .getById(params.teaSessionId)
          .subscribe((response) => {
            if (response.status) {
              this.teaSessionInfo = response.data;
              this.teaSessionInfo.treatDate = new Date(
                this.teaSessionInfo.treatDate
              );
              this.teaSessionInfo.cutOffDate = new Date(
                this.teaSessionInfo.cutOffDate
              );
              this.createSessionFormControl.teaSessionName.setValue(this.teaSessionInfo.name);
              this.createSessionFormControl.description.setValue(this.teaSessionInfo.description);
              this.createSessionFormControl.treatDate.setValue(this.toLocalISOString(this.teaSessionInfo.treatDate));
              this.createSessionFormControl.cutOffDate.setValue(this.toLocalISOString(this.teaSessionInfo.cutOffDate));
              this.createSessionFormControl.visibility.setValue(this.teaSessionInfo.visibility);
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.createSessionForm = this.formBuilder.group({
      teaSessionName: ["", Validators.required],
      password: [null],
      description: [null],
      treatDate: [null, Validators.required],
      cutOffDate: [null, Validators.required],
      visibility: [true, Validators.required],
      menu:
        this.pageMode == PageMode.create ? [null, Validators.required] : [null],
    });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null],
      newPassword: [null],
    });
  }

  get createSessionFormControl() {
    return this.createSessionForm.controls;
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  submitCreateTeaSession() {
    if (this.createSessionForm.invalid) {
      if (this.createSessionFormControl.teaSessionName.errors) {
        this.showSessionNameEmptyError = true;
      }
      if (this.createSessionFormControl.treatDate.errors) {
        this.showTreatDateEmptyError = true;
      }
      if (this.createSessionFormControl.cutOffDate.errors) {
        this.showCutOffDateEmptyError = true;
      }
      if (this.createSessionFormControl.menu.errors) {
        this.showMenuEmptyError = true;
      }
      return;
    }
    this.submittingForm = true;

    let teaSession = new TeaSessionShowUsername(
      this.createSessionFormControl.teaSessionName.value,
      this.createSessionFormControl.description.value,
      this.userInfo.username,
      this.userInfo.isAdmin? this.userInfo.password: this.createSessionFormControl.password.value,
      this.createSessionFormControl.treatDate.value,
      this.createSessionFormControl.cutOffDate.value,
      this.createSessionFormControl.visibility.value,
      this.createSessionFormControl.menu.value == null ? this.teaSessionInfo.menu : this.createSessionFormControl.menu.value
    );
    switch (this.pageMode) {
      case PageMode.create: {
        this.teaSessionService.create(teaSession).subscribe((response) => {
          this.finishCreateOrModify(response, ()=>{
            this.router.navigateByUrl("/tea-session/" + response.data);
          });
        });
        break;
      }
      default: {
        this.teaSessionService
          .modify(this.teaSessionInfo.teaSessionId, teaSession, this.userInfo.isAdmin)
          .subscribe((response) => {
            this.finishCreateOrModify(response, ()=>{
                this.onBack.emit();
            });
          });
        break;
      }
    }
  }

  submitChangePassword() {
    this.submittingForm = true;
    let teaSessionChangePassword = this.userInfo.isAdmin?
    new TeaSessionChangePasswordAdmin(
        this.userInfo.username,
        this.userInfo.password,
        this.changePasswordFormControl.newPassword.value
    ):
    new TeaSessionChangePassword(
        this.changePasswordFormControl.oldPassword.value,
        this.changePasswordFormControl.newPassword.value
    );
    this.teaSessionService
      .modifyPassword(
        this.teaSessionInfo.teaSessionId,
        teaSessionChangePassword,
        this.userInfo.isAdmin
      )
      .subscribe((response) => {
        this.finishCreateOrModify(response, () => {
          this.onBack.emit();
        });
      });
  }

  updateMenu(event: any) {
    this.showMenuEmptyError = false;
    if (!event.target.files[0]) {
      this.createSessionFormControl.menu.setValue(null);
      return;
    }
    let imageUrl = URL.createObjectURL(event.target.files[0]);
    let tempImg = new Image();
    tempImg.src = imageUrl;
    tempImg.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = tempImg.width;
      canvas.height = tempImg.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(tempImg, 0, 0);
      let dataUrl = canvas.toDataURL("image/png");
      dataUrl = dataUrl.replace("data:image/png;base64,", "");
      this.createSessionFormControl.menu.setValue(dataUrl);
      URL.revokeObjectURL(imageUrl);
    };
  }

  finishCreateOrModify(response: any, callback = () => {}) {
    this.submittingForm = false;
    if (response.status) {
        callback();
    } else {
        alert(response.statusMessage);
    }
  }

  back() {
    if (this.onBack.observers.length > 0) {
      this.onBack.emit();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  toLocalISOString(date:Date){
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
  }
}
