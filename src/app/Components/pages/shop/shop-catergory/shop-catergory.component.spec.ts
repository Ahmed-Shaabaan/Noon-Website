import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCatergoryComponent } from './shop-catergory.component';

describe('ShopCatergoryComponent', () => {
  let component: ShopCatergoryComponent;
  let fixture: ComponentFixture<ShopCatergoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCatergoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
