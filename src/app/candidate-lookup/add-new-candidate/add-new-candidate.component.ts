import { Component, OnInit, ElementRef } from '@angular/core';
import { Candidate } from 'src/app/models/candidate-model';
import { CandidateLookupService } from 'src/app/services/candidate-lookup.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import * as myGlobals from 'src/app/models/global';
import { Router } from '@angular/router';
import { ConfigDataService } from 'src/app/services/config-data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-add-new-candidate',
  templateUrl: './add-new-candidate.component.html',
  styleUrls: ['./add-new-candidate.component.scss']
})


export class AddNewCandidateComponent implements OnInit {
  candidate: Candidate;
  stage = [];
  status = [];
  position = [];
  department = [];
  checkposition: boolean;
  checkstatus = false;
  checkstage = false;
  checkdepartment = false;
  checkdate = false;
  filename: string;
  editcandidateId: any;
  showEditDataForm = false;
  editCandidate: any;
  config: any;
  checkcandidate: any;
  alertMsg: any;
  duplicateCandidateId: any;
  candidatecv: any;
  previewPdf = false;
  trustedDashboardUrl: SafeUrl;



  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: myGlobals.tool_API + 'upload', itemAlias: 'upload' });

  constructor(private candidateLookupService: CandidateLookupService, private el: ElementRef, private router: Router, private configDataService: ConfigDataService, private sanitizer: DomSanitizer) {
    this.candidate = new Candidate();
    this.candidate.position = "";
    this.candidate.department = "";
    this.candidate.stage = "";
    this.candidate.status = "";

  }

  ngOnInit() {
    this.loaddata();
    this.configFileData();
    this.checkcandidate = '';
    this.setEditCandidate();
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setEditCandidate() {
    this.editcandidateId = localStorage.getItem('EditCandidateId');
    if (this.editcandidateId != null) {
      this.editCLData(this.editcandidateId);
      this.showEditDataForm = true;
    }
    else {

      this.showEditDataForm = false;
    }
    console.log(localStorage.getItem('EditCandidateId'));
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
  // 3 Capitalize string every 1st chacter of word to uppercase
  firstCapital() {
    let str = $('#name').val();
    let spart = str.split(" ");
    for (var i = 0; i < spart.length; i++) {
      var j = spart[i].charAt(0).toUpperCase();
      spart[i] = j + spart[i].substr(1);
    }
    // $('name').val(spart.join(" "));
    this.candidate.name = spart.join(" ");

    //   return str.charAt(0).toUpperCase() + str.slice(1);

  }
  EmailChange(email: string) {
    this.candidate.email = this.candidate.email.toLowerCase();
  }
  configFileData() {
    if (localStorage.getItem('userid')) {
      this.configDataService.configData().subscribe((response) => {
        this.config = JSON.parse(response["_body"])[0].config_value;
        debugger;
        // bodyArray.forEach(element => {
        //   this.config = element['config_value'];
        //   return;
        // });
        //console.log(this.configArray);

      }, (error) => {
        console.log(error);
      })
    }
  }
  loaddata() {
    this.candidateLookupService.getCLdata().subscribe((response) => {
      this.stage = JSON.parse(response["_body"]).stages;
      this.position = JSON.parse(response["_body"]).positions;
      this.status = JSON.parse(response["_body"]).statuses;
      this.department = JSON.parse(response["_body"]).departments;
      console.log(this.stage, this.position, this.department, this.status);
    }, (error) => {
      console.log(error);
    })
  }
  addCandidate() {

    this.candidateLookupService.CheckDuplicate(this.candidate.email, this.candidate.phone).subscribe((response) => {
      this.checkcandidate = JSON.parse(response["_body"])[0];
      if (this.checkcandidate != null) {
        this.duplicateCandidateId = JSON.parse(response["_body"])[0].candidate_id;
        const checkcandidatePhone = JSON.parse(response["_body"])[0].phone;
        const checkcandidateEmail = JSON.parse(response["_body"])[0].email_id;
        if (checkcandidatePhone == this.candidate.phone && checkcandidateEmail == this.candidate.email) {
          this.alertMsg = 'Candidate with Email: ' + checkcandidateEmail + ' & Phone: ' + checkcandidatePhone + ' already exists';
          $('#exampleModalCenter').modal('show');
        }
        else {
          if (checkcandidatePhone == this.candidate.phone) {
            this.alertMsg = 'Candidate with Phone: ' + checkcandidatePhone + ' already exists';
            $('#exampleModalCenter').modal('show');
          }
          if (checkcandidateEmail == this.candidate.email) {
            this.alertMsg = 'Candidate with Email: ' + checkcandidateEmail + ' already exists';
            $('#exampleModalCenter').modal('show');
          }

        }
      }
      else {
        //this.uploader.uploadAll();
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#upload');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        let file = null;
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
          //append the key name 'photo' with the first file in the element
          // formData.append('upload', inputEl.files.item(0));
          file = inputEl.files.item(0);
        }
        this.candidateLookupService.addCandidate(this.candidate).subscribe((response) => {

          const candidateId = JSON.parse(response["_body"])[0].id;
          // this.uploader.uploadAll();
          this.uploadFileToServer(file, candidateId, this.candidate.name);
          console.log('respose is' + candidateId);
          this.resetFormField();
        }, (error) => {
          console.log('error is' + error);
        })

      }

    })
  }
  editDuplicateCandidate(id) {
    this.filename = "";
    localStorage.setItem('EditCandidateId', id);
    console.log(localStorage.getItem('EditCandidateId'));
    this.setEditCandidate();
    //this.editCLData(id);
  }
  editCLData(editcandidateId) {
    debugger;
    this.candidateLookupService.editCandidate(editcandidateId).subscribe((response) => {
      this.candidate = JSON.parse(response["_body"]);
      this.candidate.date = this.getFormattedDate(this.candidate.date);
      this.candidate.cv = JSON.parse(response["_body"]).cv;
      console.log(this.config);
      if (this.candidate.cv.endsWith(".pdf")) {
        this.previewPdf = true;
        this.trustedDashboardUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl
            (this.config + this.candidate.cv);

      }
      else {
        this.previewPdf = false;
      }

      // this.uploader.uploadAll();
      //this.uploadFileToServer(file, candidateId, this.candidate.name);
      console.log('respose is' + this.candidate);
    }, (error) => {
      console.log('error is' + error);
    })
    //this.convertpdf('6_Aaaa');
  }
  getFormattedDate(dateString) {
    var date = new Date(dateString);
    var mm = (date.getMonth() + 1);
    var month = (mm < 10) ? '0' + mm : mm;
    var dd = (date.getDate());
    var day = (dd < 10) ? '0' + dd : dd;
    return date.getFullYear() + '-' + month + '-' + day;
  }
  updateCandidateData(updateCandidateId) {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#upload');
    //get the total amount of files attached to the file input.

    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    let file = null;
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      // formData.append('upload', inputEl.files.item(0));
      file = inputEl.files.item(0);
      const curdate = new Date();
      this.candidate.date = this.getFormattedDate(curdate);
      this.candidateLookupService.updateCandidate(this.candidate).subscribe((response) => {

        //const candidateId = this.candidate.candidateId;
        // this.uploader.uploadAll();
        this.uploadUpdatedFileToServer(file, updateCandidateId, this.candidate.name);

        const fileExtension = this.candidate.cv.substr((this.candidate.cv.lastIndexOf('.') + 1));
        this.candidate.cv = this.candidate.candidateId + "_" + this.candidate.name + "." + fileExtension;

        console.log('respose is' + updateCandidateId);
        //this.resetFormField();
      }, (error) => {
        console.log('error is' + error);
      })

    }
    else {
      debugger;
      // this.candidate.cv = 
      const fileExtension = this.candidate.cv.substr((this.candidate.cv.lastIndexOf('.') + 1));
      this.candidate.cv = this.candidate.candidateId + "_" + this.candidate.name + "." + fileExtension;
      // console.log(fileExtension);
      this.candidateLookupService.updateCandidate(this.candidate).subscribe((response) => {
        //$('#editSuccessModal').modal('show');
        $.notify(
          'Record Edited Successfully', 'success',
          {
            position: 'top centre'
          }
        );
      }, (error) => {
        console.log('error is' + error);
      })
    }

  }
  uploadFileToServer(file, id, name) {
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();

    //file.name = "testing";
    formData.append("upload", file, file.name);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          //alert('file uploaded');
          // $('#exampleModalCenter').modal('show');
          $.notify(
            'Record Saved Successfully', 'success',
            { position: 'top centre' }
          );
        } else {
          alert('file not uploaded');
        }
      }
    }
    xhr.open("POST", myGlobals.tool_API + "upload?id=" + id + "&name=" + name, true);
    //xhr.open("POST", " http://10.0.9.21:3000/api/upload?id=" + id + "&name=" + name, true);
    xhr.send(formData);
  }
  uploadUpdatedFileToServer(file, id, name) {
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();

    //file.name = "testing";
    formData.append("upload", file, file.name);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          //alert('file uploaded');
          // $('#editSuccessModal').modal('show');
          $.notify(
            'Record Edited Successfully', 'success',
            {
              position: 'top centre'
            }
          );
        } else {
          alert('file not uploaded');
        }
      }
    }
    xhr.open("POST", myGlobals.tool_API + "upload?id=" + id + "&name=" + name, true);
    //xhr.open("POST", " http://10.0.9.21:3000/api/upload?id=" + id + "&name=" + name, true);
    xhr.send(formData);
  }
  resetFormField() {
    this.candidate.name = '';
    this.candidate.phone = '';
    this.candidate.email = '';
    //$("#upload").val('');
    (<HTMLInputElement>document.getElementById("upload")).value = '';
    this.filename = '';
    if (this.checkposition) {
      $("#check_position").prop('checked', true);
      this.candidate.position = this.candidate.position;
    }
    else {
      this.candidate.position = '';
      $("#check_position").prop('checked', false);
    }
    if (this.checkdepartment) {
      $("#check_dep").prop('checked', true);
    }
    else {
      this.candidate.department = '';
      $("#check_dep").prop('checked', false);
    }
    if (this.checkstatus) {
      $("#check_status").prop('checked', true);
    }
    else {
      this.candidate.status = '';
      $("#check_status").prop('checked', false);
    }
    if (this.checkstage) {
      $("#check_stage").prop('checked', true);
    }
    else {
      this.candidate.stage = '';
      $("#check_stage").prop('checked', false);
    }
    if (this.checkdate) {
      $("#check_date").prop('checked', true);
    }
    else {
      this.candidate.date = '';
      $("#check_date").prop('checked', false);
    }
  }
  resetFormField1(event) {
    if (event.target.checked && event.target.id == 'check_position') {
      this.checkposition = true;
    }
    if (event.target.checked && event.target.id == 'check_status') {
      this.checkstatus = true;
    }
    if (event.target.checked && event.target.id == 'check_stage') {
      this.checkstage = true;
    }
    if (event.target.checked && event.target.id == 'check_dep') {
      this.checkdepartment = true;
    }
    if (event.target.checked && event.target.id == 'check_date') {
      this.checkdate = true;
    }
  }
  fileEvent(event) {
    let file = event.target.files[0];
    this.filename = file.name;
  }
  resetForm() {
    this.filename = '';
    (<HTMLFormElement>document.getElementById("addCandidateForm")).reset();
  }
  convertpdf(name) {
    debugger;
    this.candidateLookupService.editCandidate(name).subscribe((response) => {
      this.candidatecv = JSON.parse(response["_body"]);
      this.candidate.date = this.getFormattedDate(this.candidate.date);
      // this.uploader.uploadAll();
      //this.uploadFileToServer(file, candidateId, this.candidate.name);
      console.log('respose is' + this.candidate);
    }, (error) => {
      console.log('error is' + error);
    })
  }
}
