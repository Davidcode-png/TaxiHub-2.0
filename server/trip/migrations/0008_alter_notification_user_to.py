# Generated by Django 3.2.16 on 2023-04-02 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_auto_20230317_1947'),
        ('trip', '0007_auto_20230402_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='user_to',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivernotif', to='user.driverprofile'),
        ),
    ]
