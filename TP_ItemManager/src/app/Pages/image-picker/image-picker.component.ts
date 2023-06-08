import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/Services/http.service';
import { FormsModule } from '@angular/forms';

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
  public imgPreviewList: string[] = [];
  public deleteMode: boolean = false;
  public filter: string = '';

  constructor(
    public dialogRef: MatDialogRef<ImagePickerComponent>,
    @Inject(MAT_DIALOG_DATA) image: string,
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) {
    this.selectedImage = image;
  }
  ngOnInit() {
    this.http.GetImages().subscribe((data) => {
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
    console.log(files.target.files);
    console.log(URL.createObjectURL(files.target.files[0]));

    if (
      this.images?.includes(files.target.files[0].name!) ||
      this.imgPreviewList?.includes(files.target.files[0].name!)
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
    this.imgPreviewList.push(image.name);
    if (image)
      this.http.UploadImage(image).subscribe((data) => {
        this.images = data.filter(
          (image) => !this.imgPreviewList.includes(image)
        );
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
      this.http.DeleteImage(imageName).subscribe((data) => {
        this.images = data.filter(
          (image) => !this.imgPreviewList.includes(image)
        );

        this.imgPreviewList = this.imgPreviewList.filter(
          (img) => img != imageName
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
