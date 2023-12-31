import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ArticleModule } from 'src/app/models/article/article.module';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { ProductCreateComponent } from '../product-create/product-create.component';

const baseURL = "/articles";
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	@ViewChild(ProductCreateComponent) child!: ProductCreateComponent;
	articles!: Array<ArticleModule>;
	private articlesSubscription: Subscription;
	images!: Array<string>;
	constructor(private api: ApiService, private common: CommonService) {
		this.articlesSubscription = this.common.getArticles().subscribe
			((articles) => {
				//articles contains the data sent from common service
				this.articles = articles;
			});
	}

	ngOnDestroy() {
		// It's a good practice to unsubscribe to ensure no memory leaks
		this.articlesSubscription.unsubscribe();
	}
	ngOnInit(): void {
		this.common.updateArticles();
	}

	edit(selected: ArticleModule) {
		this.child.fill(selected);
	}

	delete(id: number) {
		if (confirm("Are you the boss?")){
			this.api.delete("/articles/" + id);
			window.location.reload();
		}
	}


}
