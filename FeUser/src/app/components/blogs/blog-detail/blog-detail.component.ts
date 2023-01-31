import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { TypeSweetAlertIcon } from "src/app/lib/data/models";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import {
  CommentModel,
  CreateCommentModel,
  SearchCommentModel,
} from "src/app/lib/data/models/comments/comment.model";
import {
  PageModel,
  ReturnMessage,
  SearchPaganationDTO,
} from "src/app/lib/data/models/common";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import {
  AuthService,
  FileService,
  MessageService,
} from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { TypeDisplayImage } from "src/app/shared/data";

@Component({
  selector: "app-blog-detail",
  styleUrls: ["./blog-detail.component.scss"],
  templateUrl: "./blog-detail.component.html",
  providers: [CommentService, AuthService],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 1.3rem;
        color: #d3d3d3;
      }
      .full {
        color: #ffa200;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: #ffa200;
      }
    `,
  ],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  id: string;
  data: BlogModel;
  dataComment: CreateCommentModel;
  typeDisplayImage = TypeDisplayImage;
  user: UserDataReturnDTOModel;
  comments: PageModel<CommentModel>;
  searchModel: any;
  item: any;

  public rating: number;

  subDataUser: Subscription;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
    this.subDataUser = null;
  }

  ngOnInit() {
    this.subDataUser = this.authService.callUserInfo.subscribe(
      (it) => (this.user = it)
    );
    this.initDataComment();
    this.getBlog();
  }
  getBlog() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.blogService
        .getBlog(this.id)
        .then((res: ReturnMessage<BlogModel>) => {
          this.data = res.data;
        })
        .catch((er) => {
          this.messageService.alert(
            er.error.message ??
              JSON.stringify(er.error.error) ??
              "Server Disconnected",
            TypeSweetAlertIcon.ERROR
          );
        });
      this.createSearchModel();
      this.getComments();
    });
  }

  createSearchModel() {
    this.searchModel = {
      ["search.entityId"]: this.id,
      ["pageIndex"]: 0,
      ["pageSize"]: 10,
    };
  }

  changePageIndex(pageIndex: number) {
    this.searchModel = { ...this.searchModel, ["pageIndex"]: pageIndex - 1 };

    this.getComments();
  }

  getComments() {
    this.commentService
      .getBlogComments(this.searchModel)
      .then((data: ReturnMessage<PageModel<CommentModel>>) => {
        this.comments = data.data;
      })
      .catch((er) => {
        this.messageService.alert(
          er.error.message ??
            JSON.stringify(er.error.error) ??
            "Server Disconnected",
          TypeSweetAlertIcon.ERROR
        );
      });
  }

  getImage(image) {
    return FileService.getLinkFile(image);
  }

  initDataComment() {
    this.dataComment = {
      entityId: this.activatedRoute.snapshot.paramMap.get("id"),
      entityType: "Blog",
      rating: this.item ? this.item.rating : 5,
    };
  }
}
