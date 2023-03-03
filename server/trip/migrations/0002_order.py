# Generated by Django 3.2.16 on 2023-03-01 12:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_customuser_managers'),
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(blank=True, max_length=300)),
                ('destination', models.CharField(blank=True, max_length=300)),
                ('is_accepted', models.BooleanField(default=False)),
                ('payment_options', models.CharField(blank=True, choices=[('Cash', 'Cash'), ('Wallet', 'Wallet'), ('Transfer', 'Transfer')], max_length=20)),
                ('driver', models.ManyToManyField(blank=True, related_name='drivers', to='user.DriverProfile')),
                ('passenger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='passenger', to='user.customerprofile')),
            ],
        ),
    ]