import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/Services/http.service';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ImagePreview } from 'src/app/Models/ImagePreview';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent {
  public selectedImage?: string;
  public images?: string[];
  public filteredImages?: string[];
  public imgPath = 'http:\\\\localhost\\KioskImages\\';
  public imgPreviewList: ImagePreview[] = [];
  public deleteMode: boolean = false;
  public filter: string = '';
  public folderName: string;

  constructor(
    @Inject('IMAGES_URL') imageUrl: string,
    public dialogRef: MatDialogRef<ImagePickerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpService,
    private _snackBar: MatSnackBar,
    router: Router
  ) {
    this.folderName = data.folderName;
    this.selectedImage = data.image;
    this.imgPath = imageUrl;
    console.log(this.folderName);
  }
  ngOnInit() {
    this.http.GetImages(this.folderName).subscribe((data) => {
      this.images = data;
      this.filteredImages = data;
    });
  }
  ChangeFilter(filter: any) {
    this.filteredImages = this.images?.filter((image) =>
      image.includes(filter.target.value)
    );
  }
  FilterImages() {
    this.filteredImages = this.images?.filter((image) =>
      image.includes(this.filter)
    );
  }

  UploadFile(files: any) {
    // console.log(files.target.files);
    // console.log(URL.createObjectURL(files.target.files[0]));
    // console.log(files.target.files[0]);
    // console.log(files.target.files[0] instanceof File);

    if (
      this.images?.includes(files.target.files[0].name!) ||
      this.imgPreviewList?.filter((i) => i.file!.name!).length > 0
    ) {
      if (
        !confirm(
          'An image with that name already exists, do you want to replace it?'
        )
      ) {
        return;
      }
    }
    let image = files.target.files[0];
    this.imgPreviewList.push({ file: image, url: URL.createObjectURL(image) });
    if (image)
      this.http.UploadImage(this.folderName, image).subscribe((data) => {
        this.images = data.filter(
          (image) =>
            this.imgPreviewList.findIndex(
              (imgPreview) => image.split('\\')[1] == imgPreview.file!.name
            ) == -1
        );
        data.forEach((image) => console.log(image));
        this.imgPreviewList.forEach((image) => console.log(image));
        this.FilterImages();
        this._snackBar.open('Image successfully uploaded!', 'Confirm');
      });
  }

  GetUrlFromFile(file: File) {
    return URL.createObjectURL(file);
  }

  RemoveFile() {
    this.deleteMode = !this.deleteMode;
    console.log(this.deleteMode);
  }

  SaveChanges() {
    return;
  }

  DeleteImage(imageName: string) {
    if (confirm('The image will be permanently deleted!')) {
      this.imgPreviewList = this.imgPreviewList.filter(
        (img) => img.file!.name != imageName
      );
      imageName = imageName.startsWith(this.folderName)
        ? imageName
        : this.folderName + '\\' + imageName;
      this.http.DeleteImage(imageName).subscribe((data) => {
        this.images = data.filter(
          (image) =>
            this.imgPreviewList.findIndex(
              (imgPreview) => image.split('\\')[1] == imgPreview.file!.name
            ) == -1
        );

        this.imgPreviewList = this.imgPreviewList.filter(
          (img) => img.file!.name != imageName
        );
        this.FilterImages();
        this._snackBar.open('Image successfully deleted!', 'Confirm');
      });
    }
  }

  Stampa(s: any) {
    console.log(s);
  }

  SnackbarCurrentlySelected() {
    this._snackBar.open("Can't delete the selected image!", 'Confirm');
  }
}
